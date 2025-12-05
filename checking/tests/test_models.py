import io
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from users.models import CustomUser
from checking.models import ThesisSubmission, Article

@pytest.mark.django_db
def test_thesissubmission_create_without_student():
    # küçük bir "dosya" yarat
    file_content = b"Dummy thesis content"
    uploaded = SimpleUploadedFile("thesis.pdf", file_content, content_type="application/pdf")

    thesis = ThesisSubmission.objects.create(
        file=uploaded,
        status="processing"
    )

    assert thesis.id is not None
    assert thesis.student is None  # student opsiyonel
    assert thesis.status == "processing"
    assert thesis.plagiarism_score is None
    assert thesis.grammar_issues is None
    assert thesis.citations_missing is None
    assert "Thesis" in str(thesis)  # __str__ çalışıyor

@pytest.mark.django_db
def test_thesissubmission_create_with_student_and_str():
    user = CustomUser.objects.create_user(
        email="student1@example.com",
        username="stu1",
        password="StrongPass123!"
    )

    file_content = b"Another dummy thesis"
    uploaded = SimpleUploadedFile("thesis2.pdf", file_content, content_type="application/pdf")

    thesis = ThesisSubmission.objects.create(
        student=user,
        file=uploaded
    )

    assert thesis.student == user
    # default status should be "processing" if not overridden
    assert thesis.status == "processing"
    assert str(thesis) == f"Thesis {thesis.id} by {user.email}"

@pytest.mark.django_db
def test_article_embedding_and_str():
    # embedding must be a Python list (pgvector accepts list)
    emb = [0.01] * 768  # örnek 768-dim vektör
    title = "Test Article"
    content = "This is a test article content."

    article = Article.objects.create(
        title=title,
        content=content,
        embedding=emb
    )

    assert article.id is not None
    assert article.title == title
    assert article.content == content
    # pgvector stores embedding; burada uzunluğu kontrol etmek mantıklı
    assert len(article.embedding) == 768
    assert str(article) == title
