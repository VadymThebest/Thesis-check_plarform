from django.contrib import admin
from .models import ThesisSubmission

@admin.register(ThesisSubmission)
class ThesisSubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "student_id", 'file',"uploaded_at", "plagiarism_score", "status")
    list_filter = ("status",'uploaded_at')
    search_fields = ("student_id",'student__email','file')
    readonly_fields = ('uploaded_at',)
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(student=request.user)