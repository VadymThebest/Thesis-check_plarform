import os
from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from .models import ThesisSubmission
from api.nlp import run_plagiarism_and_grammar_check  # ✅ use the unified function

def index(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        print("✅ File received:", uploaded_file.name)

        # Ensure upload directory exists
        upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(upload_dir, exist_ok=True)

        # Save file
        fs = FileSystemStorage(location=upload_dir)
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = os.path.abspath(os.path.join(upload_dir, filename))
        print(f"📁 Saved at: {file_path}")
        print(f"📏 File size: {os.path.getsize(file_path)} bytes")

        # Create DB record first
        thesis = ThesisSubmission.objects.create(file=f"uploads/{filename}")

        # ✅ Run the full plagiarism + grammar + citation pipeline
        print("🚀 Running text analysis...")
        result = run_plagiarism_and_grammar_check(file_path)
        print(f"🧠 Extracted {result.get('plagiarism', 0)} plagiarism score")

        # ✅ Save results in DB
        thesis.plagiarism_score = result.get("plagiarism", 0)
        thesis.grammar_issues = result.get("grammar", 0)
        thesis.citations_missing = result.get("citations", 0)
        thesis.status = "completed"
        thesis.save()

        print("✅ Analysis done. Redirecting to results page.")
        return redirect(reverse("check", kwargs={"id": thesis.id}))

    return render(request, "index.html")


def check(request, id):
    try:
        thesis = ThesisSubmission.objects.get(id=id)
    except ThesisSubmission.DoesNotExist:
        return render(request, "check.html", {"error": "File not found."})

    return render(request, "check.html", {"submission": thesis})
