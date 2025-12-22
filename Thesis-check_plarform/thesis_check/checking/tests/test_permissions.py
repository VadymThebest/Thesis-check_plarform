from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class UserPermissionsTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="normal@example.com",
            password="test1234"
        )

        self.staff = User.objects.create_user(
            username="staffuser",
            email="staff@example.com",
            password="test1234",
            is_staff=True
        )

        self.superuser = User.objects.create_superuser(
            username="adminuser",
            email="admin@example.com",
            password="admin1234"
        )

        self.list_url = reverse("user_list")
        self.detail_url = reverse("user_detail", args=[self.user.id])

    # -------- LIST --------

    def test_anonymous_cannot_list_users(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_normal_user_cannot_list_users(self):
        self.client.force_login(self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_list_users(self):
        self.client.force_login(self.staff)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_superuser_can_list_users(self):
        self.client.force_login(self.superuser)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # -------- DETAIL --------

    def test_user_can_view_own_profile(self):
        self.client.force_login(self.user)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_view_other_profile(self):
        other = User.objects.create_user(
            username="other",
            email="other@example.com",
            password="123"
        )
        self.client.force_login(other)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_view_any_profile(self):
        self.client.force_login(self.staff)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # -------- DELETE --------

    def test_normal_user_cannot_delete(self):
        self.client.force_login(self.user)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_cannot_delete(self):
        self.client.force_login(self.staff)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_superuser_can_delete(self):
        self.client.force_login(self.superuser)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
