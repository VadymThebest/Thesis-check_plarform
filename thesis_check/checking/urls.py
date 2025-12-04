from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("check/<int:id>/", views.check, name="check"),
    path('student/dashboard/', views.student_dashboard_view, name='student_dashboard'),
    path('advisor/dashboard/', views.advisor_dashboard_view, name='advisor_dashboard'),
]
