from django.urls import path
from .views import UploadThesisView, ThesisResultView

urlpatterns = [
    path('upload/', UploadThesisView.as_view(), name='upload'),
    path('check/<int:id>/', ThesisResultView.as_view(), name='check'),
]
