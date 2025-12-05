import pytest
from unittest.mock import patch, MagicMock
from checking.semantic_search import check_plagiarism
from checking.models import Article


@pytest.mark.django_db
@patch("checking.semantic_search.engine.model")   # SentenceTransformer mock
def test_check_plagiarism_basic(mock_model):
    # ---- STEP 1 — NLP MODEL MOCK ----
    mock_model.encode.return_value = [0.01] * 768   # Fake embedding

    # ---- STEP 2 — Article queryset MOCK ----
    # Fake DB object
    fake_article = MagicMock()
    fake_article.title = "Sample Article"
    fake_article.content = "Some example article content text."
    fake_article.distance = 0.10  # distance = 0.10 => similarity = 90%
    
    # Queryset mock
    Article.objects.annotate.return_value.order_by.return_value.__getitem__.return_value = [fake_article]

    text = "This is my test document to check plagiarism."

    result = check_plagiarism(text)

    # ---- ASSERTIONS ----
    assert "plagiarism_score" in result
    assert "matches" in result

    assert result["plagiarism_score"] == 90.0     # (1 - 0.10) * 100
    assert len(result["matches"]) == 1
    assert result["matches"][0]["title"] == "Sample Article"
    assert result["matches"][0]["similarity"] == 90.0


@pytest.mark.django_db
@patch("checking.semantic_search.engine.model")
def test_check_plagiarism_no_results(mock_model):
    mock_model.encode.return_value = [0.01] * 768

    # simulate empty queryset
    Article.objects.annotate.return_value.order_by.return_value.__getitem__.return_value = []

    result = check_plagiarism("hello world")

    assert result["plagiarism_score"] == 0.0
    assert result["matches"] == []
