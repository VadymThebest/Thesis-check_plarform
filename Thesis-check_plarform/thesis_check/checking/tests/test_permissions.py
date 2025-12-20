from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class UserPermissionsTests(APITestCase):

    def setUp(self):
        # Normal user
        self.user = User.objects.create_user(
            email="normal@example.com",
            password="test1234"
        )

        # Staff user (admin-like)
        self.staff = User.objects.create_user(
            email="staff@example.com",
            password="test1234",
            is_staff=True
        )

        # Superuser
        self.superuser = User.objects.create_superuser(
            email="admin@example.com",
            password="admin1234"
        )

        self.list_url = reverse("users:list")  # örnek: /api/users/
        self.detail_url = reverse("users:detail", args=[self.user.id])  # örnek: /api/users/<id>/

    # ------------ LIST PERMISSION TESTS ------------
    def test_user_list_requires_authentication(self):
        """Anon kullanıcı user list göremez"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_normal_user_cannot_list_users(self):
        """Normal user tüm kullanıcıları listeleyemez"""
        self.client.force_login(self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_list_users(self):
        """Staff user kullanıcı listesini görebilir"""
        self.client.force_login(self.staff)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_superuser_can_list_users(self):
        """Superuser her şeyi görebilir"""
        self.client.force_login(self.superuser)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ------------ DETAIL PERMISSION TESTS ------------
    def test_user_can_view_own_profile(self):
        """Normal kullanıcı kendi profiline erişebilir"""
        self.client.force_login(self.user)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_view_other_user_profile(self):
        """Normal kullanıcı başkasının profiline erişemez"""
        other = User.objects.create_user(email="x@example.com", password="p")
        self.client.force_login(other)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_view_any_profile(self):
        """Staff tüm kullanıcı profillerini görebilir"""
        self.client.force_login(self.staff)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ------------ DELETE PERMISSION TESTS ------------
    def test_normal_user_cannot_delete(self):
        """Normal kullanıcı bir user silemez"""
        self.client.force_login(self.user)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_cannot_delete_users(self):
        """Staff kullanıcı silemez (genellikle)"""
        self.client.force_login(self.staff)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_superuser_can_delete_users(self):
        """Superuser user silebilir"""
        self.client.force_login(self.superuser)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
