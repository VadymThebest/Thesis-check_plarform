from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import (
    UploadThesisView,
    ThesisResultView,
    ResultView,
    CustomTokenObtainPairView,
    RegisterView
)

urlpatterns = [
    # 🔹 Thesis API
    path('upload/', UploadThesisView.as_view(), name='upload'),
    path('check/<int:id>/', ThesisResultView.as_view(), name='check_api'),
    path('check/', ResultView.as_view(), name='check_all'),

    # 🔹 JWT Auth API
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),   
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),        
    path('token/default/', TokenObtainPairView.as_view(), name='token_obtain_pair_default'),

    # 🔹 Registration API
    path('register/', RegisterView.as_view(), name='register'),
]
