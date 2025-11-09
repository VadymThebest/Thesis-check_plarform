import os
from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import ThesisSubmission
from api.serializers import ThesisSubmissionSerializer
from api.nlp import run_plagiarism_and_grammar_check


# ✅ API upload
class UploadThesisView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def perform_create(self, serializer):
        serializer.save(student=self.request.user, status="processing")


# ✅ Web upload page
@login_required
def index(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        fs = FileSystemStorage(location=upload_dir)
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)
        thesis = ThesisSubmission.objects.create(
            file=f"uploads/{filename}",
            student=request.user,
            status="processing",
        )
        result = run_plagiarism_and_grammar_check(file_path)
        thesis.plagiarism_score = result.get("plagiarism", 0)
        thesis.grammar_issues = result.get("grammar", 0)
        thesis.citations_missing = result.get("citations", 0)
        thesis.status = "completed"
        thesis.save()
        return redirect(reverse("check", kwargs={"id": thesis.id}))
    return render(request, "index.html")

# ✅ Dashboards
@login_required
def advisor_dashboard_view(request):
    if request.user.role != 'advisor':
        return redirect('index')
    theses = ThesisSubmission.objects.filter(advisor=request.user).order_by('-submission_date')
    return render(request, 'advisor_dashboard.html', {'title': 'Advisor Dashboard', 'theses': theses})

@login_required
def student_dashboard_view(request):
    if request.user.role != 'student':
        return redirect('index')
    theses = ThesisSubmission.objects.filter(student=request.user).order_by('-updated_at')
    return render(request, 'student_dashboard.html', {'title': 'My Thesis Submissions', 'theses': theses})

# ✅ Results view for processed thesis 
@login_required
def check(request, id):
    try:
        thesis = ThesisSubmission.objects.get(id=id)
    except ThesisSubmission.DoesNotExist:
        return render(request, "check.html", {"error": "File not found."})
    return render(request, "check.html", {"submission": thesis})


