import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
def test_permissions_no_token_cannot_upload():
    client = APIClient()
    f = SimpleUploadedFile("a.pdf", b"data")
    response = client.post(reverse("upload"), {"file": f}, format="multipart")
    assert response.status_code in [401, 403]

@pytest.mark.django_db
def test_permissions_user_cannot_access_others_submissions():
    client = APIClient()

    # User 1
    u1 = CustomUser.objects.create_user(email="u1@test.com", username="u1", password="pass")
    r1 = RefreshToken.for_user(u1)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {r1.access_token}")

    f = SimpleUploadedFile("u1.pdf", b"file1")
    upload = client.post(reverse("upload"), {"file": f}, format="multipart")
    thesis_id = upload.data["id"]

    # User 2
    u2 = CustomUser.objects.create_user(email="u2@test.com", username="u2", password="pass")
    r2 = RefreshToken.for_user(u2)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {r2.access_token}")

    # User 2 → User 1’in sonucunu göremesin
    resp = client.get(reverse("check_api", args=[thesis_id]))
    assert resp.status_code in [403, 404]
