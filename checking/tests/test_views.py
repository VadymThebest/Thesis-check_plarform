import os
import pytest
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
from django.test import Client
from rest_framework.test import APIClient
from users.models import CustomUser
from checking.models import ThesisSubmission


@pytest.mark.django_db
def test_index_view_get_renders_page():
    """GET /index/ login_required sayfası render olmalı."""
    user = CustomUser.objects.create_user(
        email="test@example.com",
        username="u1",
        password="Pass1234!"
    )

    client = Client()
    client.login(email="test@example.com", password="Pass1234!")

    response = client.get(reverse("index"))

    assert response.status_code == 200
    assert b"html" in response.content.lower()  # sayfa geldiğini kontrol eder


@pytest.mark.django_db
def test_index_view_post_upload_file(monkeypatch):
    """POST ile dosya yüklenince ThesisSubmission yaratılmalı."""

    # 1) Fake plagiarism result mock
    def fake_analysis(path):
        return {
            "plagiarism": 12.5,
            "grammar": 3,
            "citations": 1
        }

    # monkeypatch = run_plagiarism_and_grammar_check fonksiyonunu taklit eder
    import checking.views
    monkeypatch.setattr(checking.views, "run_plagiarism_and_grammar_check", fake_analysis)

    # 2) User
    user = CustomUser.objects.create_user(
        email="upload@example.com",
        username="uploaduser",
        password="Pass1234!"
    )

    client = Client()
    client.login(email="upload@example.com", password="Pass1234!")

    # 3) Fake file
    file_content = b"Dummy PDF content"
    uploaded = SimpleUploadedFile("file.pdf", file_content, content_type="application/pdf")

    response = client.post(
        reverse("index"),
        {"file": uploaded},
        format="multipart"
    )

    # Redirect after success
    assert response.status_code == 302

    # ThesisSubmission created?
    thesis = ThesisSubmission.objects.first()
    assert thesis is not None
    assert thesis.student == user
    assert thesis.plagiarism_score == 12.5
    assert thesis.grammar_issues == 3
    assert thesis.citations_missing == 1
    assert thesis.status == "completed"


@pytest.mark.django_db
def test_check_view_valid_id():
    """ /check/<id>/ doğru çalışıyor mu? """
    user = CustomUser.objects.create_user(
        email="checkuser@example.com",
        username="check1",
        password="Pass1234!"
    )

    thesis = ThesisSubmission.objects.create(
        student=user,
        file="uploads/test.pdf",
        status="completed"
    )

    client = Client()
    client.login(email="checkuser@example.com", password="Pass1234!")

    response = client.get(reverse("check", kwargs={"id": thesis.id}))

    assert response.status_code == 200
    assert b"submission" in response.content.lower()


@pytest.mark.django_db
def test_check_view_invalid_id():
    """Olmayan ID'de hata sayfası dönmeli."""
    user = CustomUser.objects.create_user(
        email="invalid@example.com",
        username="inv",
        password="Pass1234!"
    )

    client = Client()
    client.login(email="invalid@example.com", password="Pass1234!")

    response = client.get(reverse("check", kwargs={"id": 9999}))

    assert response.status_code == 200
    assert b"not found" in response.content.lower()


# ------------------------- #
#   DRF API TESTS
# ------------------------- #

@pytest.mark.django_db
def test_api_upload_thesis_authenticated(monkeypatch):
    """Token ile API'den yükleme çalışmalı."""

    # Fake plagiarism analysis
    def fake_analysis(path):
        return {
            "plagiarism": 33,
            "grammar": 4,
            "citations": 2
        }

    import checking.views
    monkeypatch.setattr(checking.views, "run_plagiarism_and_grammar_check", fake_analysis)

    client = APIClient()

    user = CustomUser.objects.create_user(
        email="api@test.com",
        username="apiuser",
        password="Pass123!45"
    )

    client.force_authenticate(user=user)

    file_content = b"PDF CONTENT"
    uploaded = SimpleUploadedFile("file.pdf", file_content, content_type="application/pdf")

    response = client.post(
        reverse("api_upload_thesis"),
        {"file": uploaded},
        format="multipart"
    )

    assert response.status_code == 201
    assert ThesisSubmission.objects.count() == 1
    thesis = ThesisSubmission.objects.first()
    assert thesis.student == user
    assert thesis.status == "processing"  # perform_create içi


@pytest.mark.django_db
def test_api_upload_thesis_requires_auth():
    """Token yoksa 401 dönmeli."""
    client = APIClient()

    file_content = b"PDF CONTENT"
    uploaded = SimpleUploadedFile("file.pdf", file_content, content_type="application/pdf")

    response = client.post(
        reverse("api_upload_thesis"),
        {"file": uploaded},
        format="multipart"
    )

    assert response.status_code == 401
