from django.contrib import admin
from .models import ThesisSubmission

@admin.register(ThesisSubmission)
class ThesisSubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "student_id", "uploaded_at", "plagiarism_score", "status")
    list_filter = ("status",)
    search_fields = ("student_id",)