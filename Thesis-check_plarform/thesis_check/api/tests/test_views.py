from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthViewTests(APITestCase):
    """
    Unit tests for authentication-related API views.
    """

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="TestPass123"
        )

        self.token_url = reverse("token_obtain_pair")
        self.refresh_url = reverse("token_refresh")

    def test_token_obtain_success(self):
        """
        User should receive access and refresh tokens with valid credentials.
        """
        data = {
            "email": "test@example.com",
            "password": "TestPass123"
        }

        response = self.client.post(self.token_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_token_obtain_invalid_credentials(self):
        """
        Invalid credentials should return 401 Unauthorized.
        """
        data = {
            "email": "test@example.com",
            "password": "WrongPassword"
        }

        response = self.client.post(self.token_url, data, format="json")

        #  Projedeki gerçek JWT davranışı
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_refresh_success(self):
        """
        Refresh token should generate a new access token.
        """
        login_data = {
            "email": "test@example.com",
            "password": "TestPass123"
        }

        login_response = self.client.post(
            self.token_url,
            login_data,
            format="json"
        )

        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        refresh_token = login_response.data["refresh"]

        refresh_response = self.client.post(
            self.refresh_url,
            {"refresh": refresh_token},
            format="json"
        )

        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh_response.data)
