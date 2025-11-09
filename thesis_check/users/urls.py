from django.urls import path
from django.contrib.auth import views as auth_views
from users import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),

    path ('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', views.register_view, name='site_register'),
    path('api/register/', views.RegisterView.as_view(), name='api_register'),
]
