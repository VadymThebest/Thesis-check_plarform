from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from checking import views
from checking.views import register_view, RegisterView  # API view
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import views as auth_views


schema_view = get_schema_view(
   openapi.Info(
      title="Thesis Check API",
      default_version='v1',
      description="API for registration, login, and thesis submission",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔹 Public pages
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('student/dashboard/', views.student_dashboard_view, name='student_dashboard'),
    path('advisor/dashboard/', views.advisor_dashboard_view, name='advisor_dashboard'),


    # 🔹 Auth views

    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', views.register_view, name='site_register'),  # HTML form
    path('api/register/', RegisterView.as_view(), name='api_register'),  # API endpoint

    # 🔹 App routes
    path('index/', include("checking.urls")),
    path('api/v1/', include('api.urls')),

    # 🔹 JWT and Swagger
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair_direct'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
