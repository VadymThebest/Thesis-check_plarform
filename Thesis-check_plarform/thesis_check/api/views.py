from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from checking.models import ThesisSubmission
from .serializers import ThesisSubmissionSerializer
from .nlp import run_plagiarism_and_grammar_check
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from users.models import CustomUser

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'role': self.user.role,
            'username': self.user.username,
        }
        return data
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

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
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save(status="processing")

            # Run the check synchronously for now (can use Celery later)
            result = run_plagiarism_and_grammar_check(submission.file.path)
            submission.plagiarism_score = result["plagiarism"]
            submission.ai_score = result["ai_score"]
            submission.grammar_issues = result["grammar"]
            submission.citations_missing = result["citations"]
            submission.status = "completed"
            submission.save()

            return Response(ThesisSubmissionSerializer(submission).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ThesisResultView(generics.RetrieveAPIView):
    queryset = ThesisSubmission.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ThesisSubmissionSerializer
    lookup_field = 'id'


class ResultView(generics.ListAPIView):
    serializer_class = ThesisSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return ThesisSubmission.objects.all().order_by("-uploaded_at")

        if user.role == "advisor":
            return ThesisSubmission.objects.all().order_by("-uploaded_at")
            # позже можно ограничить advisor → students

        return ThesisSubmission.objects.filter(student=user).order_by("-uploaded_at")