from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, update_session_auth_hash
from django.contrib import messages
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from users.forms import (
    CustomUserCreationForm,
    PasswordResetRequestForm,
    CustomSetPasswordForm,
)
from users.models import CustomUser
from users.serializers import RegisterSerializer


# =========================
# 🌐 Public pages
# =========================
def home_view(request):
    return render(request, "home.html")


def about_view(request):
    return render(request, "about.html")


def contact_view(request):
    return render(request, "contact.html")


# =========================
# 🔐 Auth views
# =========================
def register_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)

            if getattr(user, "role", None) == "admin":
                user.is_staff = True
                user.is_superuser = True

            user.save()

            authenticated_user = authenticate(
                request,
                username=user.email,
                password=form.cleaned_data.get("password1"),
            )
            if authenticated_user:
                login(request, authenticated_user)
                messages.success(request, f"🎉 Welcome, {user.username}")
                return redirect("home")
    else:
        form = CustomUserCreationForm()

    return render(request, "register.html", {"form": form})


# =========================
# 🔌 API – Registration
# =========================
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# =========================
# 🔁 Password reset
# =========================
def password_reset_request_view(request):
    if request.method == "POST":
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                messages.error(request, "User with this email does not exist.")
                return redirect("password_reset")

            token = default_token_generator.make_token(user)
            reset_link = request.build_absolute_uri(
                reverse(
                    "password_reset_confirm",
                    kwargs={"uid": user.pk, "token": token},
                )
            )

            message = render_to_string(
                "emails/password_reset_email.html",
                {"reset_link": reset_link, "user": user},
            )

            send_mail(
                "Password Reset Request",
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
            )

            messages.success(request, "Check your email for reset link.")
            return redirect("login")
    else:
        form = PasswordResetRequestForm()

    return render(request, "password_reset_request.html", {"form": form})


def password_reset_confirm_view(request, uid, token):
    user = get_object_or_404(User, pk=uid)

    if not default_token_generator.check_token(user, token):
        messages.error(request, "Invalid or expired link.")
        return redirect("password_reset")

    if request.method == "POST":
        form = CustomSetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, user)
            messages.success(request, "Password reset successful.")
            return redirect("login")
    else:
        form = CustomSetPasswordForm(user)

    return render(request, "password_reset_confirm.html", {"form": form})


# =========================
# 👤 API – USERS (TESTLERİN BEKLEDİĞİ)
# =========================
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        # Anonymous -> 401, normal user -> 403, staff/superuser -> 200
        user = getattr(self.request, "user", None)
        if not user or not user.is_authenticated:
            self.permission_denied(self.request, message="Authentication credentials were not provided.")
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        if not request.user.is_staff and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)


class UserDetailView(generics.RetrieveDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        user = request.user

        if user.is_staff or user.is_superuser or obj == user:
            return super().retrieve(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
