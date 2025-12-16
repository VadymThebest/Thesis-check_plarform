from django import forms
from .models import ThesisSubmission

class ThesisUploadForm(forms.ModelForm):
    class Meta:
        model = ThesisSubmission
        fields = ['file']
