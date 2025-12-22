from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('advisor', 'Advisor'),
        ('admin', 'Admin'),
    )
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # username всё ещё нужен, но email — основной логин

    def __str__(self):
        return f"{self.email} ({self.role})"
    
def save(self, *args, **kwargs):
    if self.role == 'admin':
        self.is_staff = True
        self.is_superuser = True
    elif self.role == 'advisor':
        self.is_staff = True
    super().save(*args, **kwargs)
