import pytest
from django.core.files.base import ContentFile
from users.models import CustomUser
from checking.models import ThesisSubmission, Article

@pytest.mark.django_db
def test_thesis_submission_with_student():
    user = CustomUser.objects.create_user(
        email="student@example.com",
        username="stu",
        password="Pass123!"
    )

    file = ContentFile(b"Test content", name="test.txt")

    submission = ThesisSubmission.objects.create(
        student=user,
        file=file,
        status="processing",
        plagiarism_score=0.1,
        grammar_issues=3,
        citations_missing=0
    )

    assert submission.student == user
    assert submission.status == "processing"
    assert submission.plagiarism_score == 0.1
    assert submission.grammar_issues == 3
    assert submission.citations_missing == 0
    assert "Thesis" in str(submission)


@pytest.mark.django_db
def test_thesis_submission_without_student():
    file = ContentFile(b"No student", name="nofile.txt")

    submission = ThesisSubmission.objects.create(
        student=None,
        file=file,
        status="processing"
    )

    assert submission.student is None
    assert submission.status == "processing"


@pytest.mark.django_db
def test_article_model():
    emb = [0.01] * 768
    article = Article.objects.create(
        title="Test Title",
        content="Test content",
        embedding=emb
    )

    assert article.id is not None
    assert len(article.embedding) == 768
    assert str(article) == "Test Title"
