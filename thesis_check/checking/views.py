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


# ✅ API view for uploading theses (token-protected)
class UploadThesisView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def perform_create(self, serializer):
        # Save record with current authenticated user
        serializer.save(student=self.request.user, status="processing")


# ✅ Web upload page (login required)
@login_required
def index(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        print("✅ File received:", uploaded_file.name)

        # Ensure upload directory exists
        upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(upload_dir, exist_ok=True)

        # Save uploaded file
        fs = FileSystemStorage(location=upload_dir)
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)

        # Create new ThesisSubmission record
        thesis = ThesisSubmission.objects.create(
            file=f"uploads/{filename}",
            student=request.user,
            status="processing",
        )

        # Run text analysis
        print("🚀 Running text analysis...")
        result = run_plagiarism_and_grammar_check(file_path)

        # Save analysis results in DB
        thesis.plagiarism_score = result.get("plagiarism", 0)
        thesis.grammar_issues = result.get("grammar", 0)
        thesis.citations_missing = result.get("citations", 0)
        thesis.status = "completed"
        thesis.save()

        print("✅ Redirecting to check page for ID:", thesis.id)
        return redirect(reverse("check", kwargs={"id": thesis.id}))

    return render(request, "index.html")


# ✅ Results view for processed thesis
@login_required
def check(request, id):
    try:
        thesis = ThesisSubmission.objects.get(id=id)
    except ThesisSubmission.DoesNotExist:
        return render(request, "check.html", {"error": "File not found."})

    return render(
        request,
        "check.html",
        {"submission": thesis},
    )
