from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('upload-thesis/', views.upload_thesis, name='upload_thesis'),
    path('upload/', views.upload_form, name='upload_form'),
    path('check-plagiarism/', views.check_plagiarism, name='check_plagiarism'),
    path('check-ai/', views.check_ai, name='check_ai'),   # 9. sayfa
    path("report/", views.report_page, name="report"),
    path('checks-history/', views.checks_history, name='checks_history'),
    path("admin-dashboard/", views.admin_dashboard, name="admin_dashboard"),
    path('user-dashboard/', views.user_dashboard, name='user_dashboard'),
    path('my-reports/', views.my_reports, name='my_reports'),
]
