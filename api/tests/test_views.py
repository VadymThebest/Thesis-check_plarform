from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from checking.models import ThesisSubmission
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch
from django.core.files.uploadedfile import SimpleUploadedFile


class ApiViewsTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        # CustomUser kullanıyoruz!
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="testpass"
        )

        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    @patch("checking.api.views.run_plagiarism_and_grammar_check")
    def test_api_create_view(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 15.5,
            "grammar": 2,
            "citations": 0
        }

        test_file = SimpleUploadedFile("test.txt", b"Test content")
        url = reverse("upload")   # ← düzeltildi
        data = {"file": test_file}

        response = self.client.post(url, data, format='multipart')

        self.assertIn(response.status_code, [200, 201])
        self.assertEqual(response.data["plagiarism_score"], 15.5)
        self.assertEqual(response.data["grammar_issues"], 2)
        self.assertEqual(response.data["citations_missing"], 0)

    @patch("checking.api.views.run_plagiarism_and_grammar_check")
    def test_upload_creates_thesis(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 10.0,
            "grammar": 1,
            "citations": 0
        }

        test_file = SimpleUploadedFile("test2.txt", b"Another test content")
        url = reverse("upload")
        data = {"file": test_file}

        response = self.client.post(url, data, format='multipart')

        self.assertIn(response.status_code, [200, 201])

        thesis = ThesisSubmission.objects.get(id=response.data["id"])
        self.assertEqual(thesis.plagiarism_score, 10.0)
        self.assertEqual(thesis.grammar_issues, 1)
        self.assertEqual(thesis.citations_missing, 0)

    def test_api_list_view(self):
        url = reverse("check_all")  # ← düzeltildi
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
