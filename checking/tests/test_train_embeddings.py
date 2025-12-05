from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class TrainEmbeddingsTests(APITestCase):

    def setUp(self):
        # Normal user
        self.user = User.objects.create_user(
            email="normal@example.com",
            password="test1234"
        )

        # Staff user (embedding eğitme izni olmalı)
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

        self.url = reverse("checking:train_embeddings")  
        # örnek: /api/checking/train-embeddings/

    # -------------------------------
    # AUTH TESTS
    # -------------------------------

    def test_anonymous_cannot_train_embeddings(self):
        """Anonim kullanıcı embedding eğitemez"""
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_normal_user_cannot_train_embeddings(self):
        """Normal kullanıcı embedding eğitemez"""
        self.client.force_login(self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_train_embeddings(self):
        """Staff kullanıcı embedding eğitebilir"""
        self.client.force_login(self.staff)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Mesaj doğrulama
        self.assertIn("trained", response.data["message"].lower())

    def test_superuser_can_train_embeddings(self):
        """Superuser embedding eğitebilir"""
        self.client.force_login(self.superuser)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("trained", response.data["message"].lower())

    # -------------------------------
    # FUNCTIONAL BEHAVIOR TEST
    # -------------------------------

    def test_train_embeddings_calls_training_function(self):
        """
        train_embeddings view içerisindeki train() fonksiyonunun çağrıldığını test eder.
        """
        # Patch (mock) kullanmak için unittest.mock import edilir
        from unittest.mock import patch

        with patch("checking.train_embeddings.train.run_training") as mocked_train:
            mocked_train.return_value = True

            self.client.force_login(self.staff)
            response = self.client.post(self.url)

            # Fonksiyon çağrıldı mı?
            mocked_train.assert_called_once()

            # Response kontrolü
            self.assertEqual(response.status_code, status.HTTP_200_OK)
