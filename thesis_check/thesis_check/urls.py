from django.contrib import admin
from django.urls import path, include
from checking import views as checking_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),  # API uygulaması URL’leri
    path('', checking_views.home, name='home'),  # Ana sayfa
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
