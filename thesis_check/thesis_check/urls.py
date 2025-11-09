from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView

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

    # 🔹 Users app
    path('', include('users.urls')),

    # 🔹 Thesis checking app
    path('index/', include('checking.urls')),

    # 🔹 API routes
    path('api/v1/', include('api.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair_direct'),

    # 🔹 Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
