from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class TrainEmbeddingsTests(APITestCase):

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

        self.url = reverse("train_embeddings")

    # -------------------------------
    # AUTH TESTS
    # -------------------------------

    def test_anonymous_cannot_train_embeddings(self):
        response = self.client.post(self.url)
        # Anonymous kullanıcı artık 403 dönecek DRF izinleri nedeniyle
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_normal_user_cannot_train_embeddings(self):
        self.client.force_login(self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_train_embeddings(self):
        self.client.force_login(self.staff)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_superuser_can_train_embeddings(self):
        self.client.force_login(self.superuser)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
