from django import forms
from users.models import CustomUser
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import SetPasswordForm

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'role')

class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(label="Email", max_length=254)

User = get_user_model()

class CustomSetPasswordForm(SetPasswordForm):

    pass