import time
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile
from unittest.mock import patch

@pytest.mark.django_db
@patch("checking.api.views.run_plagiarism_and_grammar_check")
def test_upload_speed(mock_check):
    # Mock fonksiyonun döneceği değer
    mock_check.return_value = {"plagiarism": 1, "grammar": 0, "citations": 0}

    # Test için kullanıcı oluştur
    user = CustomUser.objects.create_user(
        email="per@test.com",
        username="p",
        password="p123"
    )

    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    # Test dosyası oluştur
    file = SimpleUploadedFile("speed.pdf", b"12345")

    # İşlem süresini ölç
    start = time.time()
    client.post(reverse("upload"), {"file": file}, format="multipart")
    duration = time.time() - start

    # 1 saniyeden kısa sürmeli
    assert duration < 1.0
