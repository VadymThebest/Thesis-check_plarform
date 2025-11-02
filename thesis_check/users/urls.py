from django.urls import path
from .views import RegisterView
from.views import register_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='api_register'),
    path('register/', register_view, name='site_register'),
]
