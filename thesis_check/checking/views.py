import os
import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from .models import ThesisSubmission # <-- make sure you have this model
from api.nlp import run_plagiarism_and_grammar_check  # <-- your analysis logic
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from api.serializers import ThesisSubmissionSerializer
from django.contrib.auth.decorators import login_required


class UploadThesisView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]  # 👈 защита по токену
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def perform_create(self, serializer):
        serializer.save(student=self.request.user, status="processing")

@login_required

def index(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        print("✅ File received:", uploaded_file.name)

        fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, "uploads"))
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)

        thesis = ThesisSubmission.objects.create(
        file=f"uploads/{filename}",
        student=request.user,
        status="processing"
)


        print("✅ Redirecting to check page for ID:", thesis.id)
        return redirect(reverse("check", kwargs={"id": thesis.id}))

    print("⚠️ No file found in POST")
    return render(request, "index.html")

@login_required

def check(request, id):
    """
    Displays results for a given thesis file.
    """
    try:
        thesis = ThesisSubmission.objects.get(id=id)
        file_path = thesis.file.path
    except ThesisSubmission.DoesNotExist:
        return render(request, "check.html", {"error": "File not found."})

    # Run the check
    results = run_plagiarism_and_grammar_check(file_path)

    return render(request, "check.html", {
        "submission": thesis,
        "results": results
    })

