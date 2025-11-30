from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def about(request):
    return render(request, 'frontend/about.html')

def contact(request):
    return render(request, 'frontend/contact.html')

def login_view(request):
    return render(request, 'frontend/login.html')

def signup(request):
    return render(request, 'frontend/signup.html')

def upload_thesis(request):
    # dashboard sayfan
    return render(request, 'frontend/upload_thesis.html')

def upload_form(request):
    # Upload Your Thesis sayfan
    return render(request, 'frontend/upload_form.html')

def check_plagiarism(request):
    # Check for Plagiarism sayfan
    return render(request, 'frontend/check_plagiarism.html')
def check_ai(request):
    return render(request, 'frontend/check_ai.html')
def report_page(request):
    data = {
        "plagiarism": 7,
        "plagiarism_level": "Low",
        "similar_sources": ["Doe, J. A. Smith...", "Johnson (2018)..."],
        "grammar_issues": 14,
        "citation_accuracy": 92,
        "details": [
            ("blue", "Several sentences missing quotations."),
            ("red", "Unexpected comma in compound sentence."),
            ("yellow", "Tense shift: consider replacing 'is' with 'was'."),
            ("purple", "Replace with 'Emerald Publishing'."),
        ]
    }
    return render(request, "frontend/report.html", data)
def checks_history(request):
    checks = [
        {
            "file_name": "Thesis_Draft.pdf",
            "date": "Apr 25, 2024",
            "status": "Completed",
        },
        {
            "file_name": "thesis_final_v2.pdf",
            "date": "Apr 24, 2024",
            "status": "Completed",
        },
        {
            "file_name": "DA_Thesis.pdf",
            "date": "Apr 22, 2024",
            "status": "Completed",
        },
        {
            "file_name": "Thesis_Marketing.docx",
            "date": "Apr 21, 2024",
            "status": "Completed",
        },
        {
            "file_name": "report.docx",
            "date": "Apr 20, 2024",
            "status": "80% complete",
        },
    ]
    return render(request, "frontend/checks_history.html", {"checks": checks})
def admin_dashboard(request):
    data = {
        "total_users": 1573,
        "total_theses": 345,
        "system_load": 25,
        "recent_users": [
            {
                "name": "Jhon Duran",
                "email": "jhon.duran@example.com",
                "theses": 10,
                "status": "Active",
            }
        ],
    }
    return render(request, "frontend/admin_dashboard.html", data)
def user_dashboard(request):
    data = {
        "total_checks": 128,
        "avg_plagiarism": 15,
        "last_score": 85,
        "recent_checks": [
            {"date": "Apr 25, 2024", "score": "84%", "file": "Thesis_Draft.pdf",  "status": "Completed"},
            {"date": "Apr 24, 2024", "score": "17%", "file": "Chapter2_docx",    "status": "Completed"},
            {"date": "Apr 22, 2024", "score": "23%", "file": "review.pdf",       "status": "Completed"},
            {"date": "Apr 21, 2024", "score": "92%", "file": "intro.docx",       "status": "Completed"},
            {"date": "Apr 20, 2024", "score": "73%", "file": "report.docx",      "status": "Completed"},
        ],
        # Çizgi grafiği için sadece placeholder; SVG içinde sabit çizeceğiz
        "weekly_labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    }
    return render(request, "frontend/user_dashboard.html", data)
def my_reports(request):
    data = {
        "reports": [
            {
                "title": "AI-based Plagiarism Detection",
                "plagiarism": "12%",
                "grammar": "B+",
                "citations": "8.7",
            },
            {
                "title": "Automated Grammer Checking",
                "plagiarism": "5%",
                "grammar": "A",
                "citations": "9.2",
            },
        ],
        "last_update": "Nov 23, 2025",
    }
    return render(request, "frontend/my_reports.html", data)

