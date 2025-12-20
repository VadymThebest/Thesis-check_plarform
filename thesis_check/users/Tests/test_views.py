# users/tests/test_views.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser

class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_api(self):
        url = reverse('api_register')
        data = {
            'email': 'user2@example.com',
            'username': 'user2',
            'password': 'ComplexPass123!',
            'role': 'student'
        }
        response = self.client.post(url, data, format='json')
        self.assertIn(response.status_code, [200, 201])
        self.assertTrue(CustomUser.objects.filter(email='user2@example.com').exists())
