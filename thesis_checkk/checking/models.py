from django.db import models
from pgvector.django import VectorField

class ThesisSubmission(models.Model):
    student_id = models.CharField(max_length=50)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    plagiarism_score = models.FloatField(null=True, blank=True)
    grammar_issues = models.IntegerField(null=True, blank=True)
    citations_missing = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default="processing")

    def __str__(self):
        return f"Thesis {self.id} by {self.student_id}"
    

class Article(models.Model):
    title = models.TextField(max_length=255)
    content = models.TextField()
    embedding = VectorField(dimensions=768)
