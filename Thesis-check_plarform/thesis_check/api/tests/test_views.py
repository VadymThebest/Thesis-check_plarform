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

<<<<<<< HEAD
        # CustomUser kullanıyoruz!
=======
>>>>>>> 0c640b65 (Add selected changes from General_project)
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="testpass"
        )

        refresh = RefreshToken.for_user(self.user)
<<<<<<< HEAD
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    @patch("checking.api.views.run_plagiarism_and_grammar_check")
    def test_api_create_view(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 15.5,
=======
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}'
        )

    @patch("api.views.run_plagiarism_and_grammar_check")
    def test_api_create_view(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 15.5,
            "ai_score": 0.82,      # ✅ EKLENDİ
>>>>>>> 0c640b65 (Add selected changes from General_project)
            "grammar": 2,
            "citations": 0
        }

        test_file = SimpleUploadedFile("test.txt", b"Test content")
<<<<<<< HEAD
        url = reverse("upload")   # ← düzeltildi
=======
        url = reverse("upload")
>>>>>>> 0c640b65 (Add selected changes from General_project)
        data = {"file": test_file}

        response = self.client.post(url, data, format='multipart')

        self.assertIn(response.status_code, [200, 201])
        self.assertEqual(response.data["plagiarism_score"], 15.5)
<<<<<<< HEAD
        self.assertEqual(response.data["grammar_issues"], 2)
        self.assertEqual(response.data["citations_missing"], 0)

    @patch("checking.api.views.run_plagiarism_and_grammar_check")
    def test_upload_creates_thesis(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 10.0,
=======
        self.assertEqual(response.data["ai_score"], 0.82)     # ✅
        self.assertEqual(response.data["grammar_issues"], 2)
        self.assertEqual(response.data["citations_missing"], 0)

    @patch("api.views.run_plagiarism_and_grammar_check")
    def test_upload_creates_thesis(self, mock_run_check):
        mock_run_check.return_value = {
            "plagiarism": 10.0,
            "ai_score": 0.45,      # ✅ EKLENDİ
>>>>>>> 0c640b65 (Add selected changes from General_project)
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
<<<<<<< HEAD
=======
        self.assertEqual(thesis.ai_score, 0.45)               # ✅
>>>>>>> 0c640b65 (Add selected changes from General_project)
        self.assertEqual(thesis.grammar_issues, 1)
        self.assertEqual(thesis.citations_missing, 0)

    def test_api_list_view(self):
<<<<<<< HEAD
        url = reverse("check_all")  # ← düzeltildi
=======
        url = reverse("check_all")
>>>>>>> 0c640b65 (Add selected changes from General_project)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
