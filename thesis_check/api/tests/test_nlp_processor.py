import os
import pytest
from django.conf import settings
from django.core.files.base import ContentFile

# ✅ Doğru import yolları
from api.nlp import extract_text, count_grammar_issues, check_citations, run_plagiarism_and_grammar_check

@pytest.mark.django_db
def test_extract_text_txt(tmp_path):
    # geçici bir txt dosyası oluştur
    file_path = tmp_path / "dummy.txt"
    file_path.write_text("This is a test text.")
    
    text = extract_text(str(file_path))
    assert text == "This is a test text."

@pytest.mark.django_db
def test_count_grammar_issues_simple():
    text = "This are bad grammar."
    issues = count_grammar_issues(text)
    assert issues > 0  # yanlış gramer olduğu için >0 olmalı

@pytest.mark.django_db
def test_check_citations_found():
    text = "This is a citation [1]."
    missing = check_citations(text)
    assert missing == 0

@pytest.mark.django_db
def test_check_citations_missing():
    text = "No references here."
    missing = check_citations(text)
    assert missing == 1

@pytest.mark.django_db
def test_run_plagiarism_and_grammar_check(tmp_path):
    file_path = tmp_path / "thesis.txt"
    file_path.write_text("This is a dummy thesis for testing plagiarism and grammar.")
    
    result = run_plagiarism_and_grammar_check(str(file_path))
    assert "plagiarism" in result
    assert "grammar" in result
    assert "citations" in result
