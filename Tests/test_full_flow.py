import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch

@pytest.mark.django_db
@patch("checking.api.views.run_plagiarism_and_grammar_check")
def test_full_flow(mock_check):
    mock_check.return_value = {
        "plagiarism": 22.5,
        "grammar": 3,
        "citations": 1
    }

    client = APIClient()

    # ---- 1) USER REGISTER ----
    user = CustomUser.objects.create_user(
        email="flow@example.com",
        username="flow",
        password="FlowPass123!"
    )

    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    # ---- 2) THESIS UPLOAD ----
    file = SimpleUploadedFile("flow.pdf", b"Flow content")
    response = client.post(reverse("upload"), {"file": file}, format="multipart")

    assert response.status_code in [200, 201]
    thesis_id = response.data["id"]

    # ---- 3) GET RESULT ----
    result = client.get(reverse("check_api", args=[thesis_id]))
    assert result.status_code == 200
    assert result.data["plagiarism_score"] == 22.5

    # ---- 4) LIST ALL ----
    listing = client.get(reverse("check_all"))
    assert listing.status_code == 200
    assert len(listing.data) >= 1
