import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
def test_upload_requires_file():
    user = CustomUser.objects.create_user(email="x@test.com", username="x", password="x123")
    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    resp = client.post(reverse("upload"), {}, format="multipart")
    assert resp.status_code == 400
    assert "file" in resp.data
