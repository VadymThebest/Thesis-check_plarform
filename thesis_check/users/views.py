from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from users.forms import CustomUserCreationForm
from users.models import CustomUser
from rest_framework import generics
from users.serializers import RegisterSerializer
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User

# 🔹 Public pages
def home_view(request):
    return render(request, "home.html")

def about_view(request):
    return render(request, "about.html")

def contact_view(request):
    return render(request, "contact.html")

# 🔹 Auth views
def login_view(request):
    if request.method == 'POST':
        email_or_username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=email_or_username, password=password)
        if user:
            login(request, user)
            messages.success(request, f"👋 Welcome back, {user.username}!")
            return redirect('index')
        else:
            messages.error(request, "Invalid credentials.")
            return redirect('login')
    return render(request, 'login.html')

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            if user.role == 'admin':
                user.is_staff = True
                user.is_superuser = True
            user.save()
            authenticated_user = authenticate(
                request,
                username=user.email,
                password=form.cleaned_data.get('password1')
            )
            if authenticated_user:
                login(request, authenticated_user)
                messages.success(request, f"🎉 Welcome, {user.username}")
                return redirect('index')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

# 🔹 API registration
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

# 🔹 Forgot Password request
def password_reset_request_view(request):
    if request.method == "POST":
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                reset_link = request.build_absolute_uri(
                    reverse('password_reset_confirm', kwargs={'uid': user.pk, 'token': token})
                )
                message = render_to_string('emails/password_reset_email.html', {'reset_link': reset_link, 'user': user})
                send_mail(
                    'Password Reset Request',
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                messages.success(request, "✅ Check your email for the password reset link.")
                return redirect('login')
            except User.DoesNotExist:
                messages.error(request, "❌ User with this email does not exist.")
    else:
        form = PasswordResetRequestForm()
    return render(request, 'password_reset_request.html', {'form': form})

# 🔹 Reset password confirm
def password_reset_confirm_view(request, uid, token):
    user = get_object_or_404(User, pk=uid)
    
    if not default_token_generator.check_token(user, token):
        messages.error(request, "❌ The password reset link is invalid or has expired.")
        return redirect('password_reset')

    if request.method == 'POST':
        form = CustomSetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, user)
            messages.success(request, "✅ Your password has been reset successfully!")
            return redirect('login')
    else:
        form = CustomSetPasswordForm(user)

    return render(request, 'password_reset_confirm.html', {'form': form})


def password_reset_request_view(request):
    if request.method == "POST":
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            form.save(
                request=request,
                email_template_name='password_reset_email.html',
                use_https=request.is_secure(),
                domain_override='127.0.0.1:8000'
            )
            messages.success(request, "📧 Password reset email has been sent.")
            return redirect('login')
    else:
        form = PasswordResetForm()
    return render(request, "password_reset_request.html", {"form": form})
