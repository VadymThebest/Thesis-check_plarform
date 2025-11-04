from django.urls import path
from .views import UploadThesisView, ThesisResultView, ResultView

urlpatterns = [
    path('upload/', UploadThesisView.as_view(), name='upload'),
    path('check/<int:id>/', ThesisResultView.as_view(), name='check_api'),
    path('check/', ResultView.as_view(), name='check_all'),
]
