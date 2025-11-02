from rest_framework import generics, status
from rest_framework.response import Response
from checking.models import ThesisSubmission
from .serializers import ThesisSubmissionSerializer
from .nlp import run_plagiarism_and_grammar_check
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CustomTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        operation_description="Получить access и refresh JWT токены",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['email', 'password']
        )
    )          
    def post(self, request, *args, **kwargs):
      return super().post(request, *args, **kwargs)


class UploadThesisView(generics.CreateAPIView):
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save(status="processing")

            # Run the check synchronously for now (can use Celery later)
            result = run_plagiarism_and_grammar_check(submission.file.path)
            submission.plagiarism_score = result["plagiarism"]
            submission.grammar_issues = result["grammar"]
            submission.citations_missing = result["citations"]
            submission.status = "completed"
            submission.save()

            return Response(ThesisSubmissionSerializer(submission).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ThesisResultView(generics.RetrieveAPIView):
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer
    lookup_field = 'id'
