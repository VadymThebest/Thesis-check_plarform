import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from checking.forms import ThesisUploadForm

@pytest.mark.django_db
def test_upload_form_valid():
    file_content = b"PDF test"
    uploaded = SimpleUploadedFile("thesis.pdf", file_content, content_type="application/pdf")

    form = ThesisUploadForm(files={"file": uploaded})

    assert form.is_valid(), "Form geçerli olmalı"
    thesis = form.save(commit=False)

    assert thesis.file.name.startswith("uploads/") is False  # daha kaydedilmedi
    assert thesis.pk is None  # commit=False

@pytest.mark.django_db
def test_upload_form_invalid_when_no_file():
    form = ThesisUploadForm(data={})
    assert not form.is_valid()
    assert "file" in form.errors
