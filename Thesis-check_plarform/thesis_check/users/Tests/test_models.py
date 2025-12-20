# users/tests/test_models.py
from django.test import TestCase
from users.models import CustomUser

class CustomUserModelTest(TestCase):
    def test_create_user(self):
        user = CustomUser.objects.create_user(
            email='user@example.com',
            username='user1',
            password='ComplexPass123!',
            role='student'
        )
        self.assertEqual(user.email, 'user@example.com')
        self.assertEqual(user.role, 'student')
        self.assertTrue(user.check_password('ComplexPass123!'))

    def test_str_method(self):
        user = CustomUser(email='user@example.com', username='user1', role='admin')
        self.assertEqual(str(user), 'user@example.com (admin)')
