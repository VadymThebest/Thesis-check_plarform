from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from users.forms import CustomUserCreationForm
from users.models import CustomUser
from rest_framework import generics
from users.serializers import RegisterSerializer

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
