# users/tests/test_forms.py
from django.test import TestCase
from users.forms import CustomUserCreationForm

class CustomUserCreationFormTest(TestCase):
    def test_form_valid_data(self):
        form_data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'role': 'student',
            'password1': 'ComplexPass123!',
            'password2': 'ComplexPass123!',
        }
        form = CustomUserCreationForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_form_invalid_data(self):
        form_data = {
            'email': 'invalid-email',
            'username': '',
            'role': 'student',
            'password1': 'pass',
            'password2': 'pass2',
        }
        form = CustomUserCreationForm(data=form_data)
        self.assertFalse(form.is_valid())
