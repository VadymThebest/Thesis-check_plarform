# users/tests/test_serializers.py
from django.test import TestCase
from users.serializers import RegisterSerializer
from users.models import CustomUser

class RegisterSerializerTest(TestCase):
    def test_serializer_valid_data(self):
        data = {
            'email': 'user@example.com',
            'username': 'user1',
            'password': 'ComplexPass123!',
            'role': 'student'
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, 'user@example.com')
        self.assertEqual(user.role, 'student')
