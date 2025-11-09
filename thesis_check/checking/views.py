import os
from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from users.models import CustomUser
from users.forms import CustomUserCreationForm
from .models import ThesisSubmission
from api.serializers import ThesisSubmissionSerializer
from api.nlp import run_plagiarism_and_grammar_check
from users.serializers import RegisterSerializer
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

# ✅ Static pages
def home_view(request):
    return render(request, "home.html")

def about_view(request):
    return render(request, "about.html")

def contact_view(request):
    return render(request, "contact.html")


# ✅ Auth views
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f"👋 Welcome back, {user.username}!")
            return redirect('index')  
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            if user.role == 'admin':
             user.is_staff = True
             user.is_superuser = True
             user = form.save()
            messages.success(request, "🎉 Registration was successful, welcome! " + user.username)
            return redirect('index')  
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})


# ✅ API view for uploading theses (token-protected)
class UploadThesisView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def perform_create(self, serializer):
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
# ✅ Advisor dashboard
@login_required
def advisor_dashboard_view(request):
    if request.user.role != 'advisor':
        return redirect('index')
    theses = ThesisSubmission.objects.filter(advisor=request.user).order_by('-submission_date')
    return render(request, 'advisor_dashboard.html', {
        'title': 'Advisor Dashboard',
        'theses': theses,
    })


# ✅ Student dashboard
@login_required
def student_dashboard_view(request):
    if request.user.role != 'student':
        return redirect('index')
    theses = ThesisSubmission.objects.filter(student=request.user).order_by('-updated_at')
    return render(request, 'student_dashboard.html', {
        'title': 'My Thesis Submissions',
        'theses': theses,
    })


# ✅ Results view for processed thesis
@login_required
def check(request, id):
    try:
        thesis = ThesisSubmission.objects.get(id=id)
    except ThesisSubmission.DoesNotExist:
        return render(request, "check.html", {"error": "File not found."})

    return render(request, "check.html", {"submission": thesis})