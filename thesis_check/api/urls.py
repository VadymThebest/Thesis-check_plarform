from django.urls import path
from .views import UploadThesisView, ThesisResultView, ResultView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomTokenObtainPairView

urlpatterns = [
    path('upload/', UploadThesisView.as_view(), name='upload'),
    path('check/<int:id>/', ThesisResultView.as_view(), name='check_api'),
    path('check/', ResultView.as_view(), name='check_all'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
