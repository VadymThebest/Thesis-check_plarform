from django.db import models
from django.conf import settings
from pgvector.django import VectorField

class ThesisSubmission(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,      
        blank=True,
        related_name='thesis_submissions',
    )
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    plagiarism_score = models.FloatField(null=True, blank=True)
    grammar_issues = models.IntegerField(null=True, blank=True)
    citations_missing = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default="processing")

    def __str__(self):
     if self.student and hasattr(self.student, "email"):
        return f"Thesis {self.id} by {self.student.email}"
     return f"Thesis {self.id} (без пользователя)"

class Article(models.Model):
    title = models.TextField(max_length=255)
    content = models.TextField()
    embedding = VectorField(dimensions=768)

    def __str__(self):
            return self.title