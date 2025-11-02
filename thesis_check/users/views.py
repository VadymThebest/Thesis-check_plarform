from rest_framework import generics
from users.models import CustomUser
from .serializers import RegisterSerializer
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer


def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/index/')  
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})
