from django.urls import path
from django.contrib.auth import views as auth_views
from users.views import (
    home_view,
    about_view,
    contact_view,
    register_view,
    RegisterView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    path('', home_view, name='home'),
    path('about/', about_view, name='about'),
    path('contact/', contact_view, name='contact'),

    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', register_view, name='site_register'),

    path('api/register/', RegisterView.as_view(), name='api_register'),
    path('api/users/', UserListView.as_view(), name='user_list'),
    path('api/users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
]
