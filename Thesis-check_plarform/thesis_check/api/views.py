from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings

from checking.models import ThesisSubmission
from .serializers import ThesisSubmissionSerializer, RegisterSerializer
from .nlp import run_plagiarism_and_grammar_check
from users.models import CustomUser


import logging

logger = logging.getLogger(__name__)
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
        expected_role = self.context["request"].data.get("expected_role")

        data = super().validate(attrs)

        user = self.user

        if expected_role and user.role != expected_role:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied(
                detail=f"This account is registered as {user.role}, not {expected_role}"
            )

        data["user"] = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "username": user.username,
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

        return ThesisSubmission.objects.filter(student=user).order_by("-uploaded_at")

class ForgotPasswordView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"detail": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "If this email exists, a reset link was sent"},
                status=status.HTTP_200_OK
            )

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:3000/reset-password/{uid}/{token}"

        logger.info(f"PASSWORD RESET LINK: {reset_link}")
        print("\n========== PASSWORD RESET ==========")
        print(f"User: {user.email}")
        print(f"Reset link:\n{reset_link}")
        print("====================================\n")

        send_mail(
            subject="Password reset",
            message=f"Reset your password:\n{reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

        return Response(
            {"detail": "Password reset link sent"},
            status=status.HTTP_200_OK
        )

class ResetPasswordView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        password = request.data.get("password")

        if not password:
            return Response(
                {"detail": "Password is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except Exception:
            return Response(
                {"detail": "Invalid reset link"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"detail": "Token is invalid or expired"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(password)
        user.save()

        return Response(
            {"detail": "Password has been reset successfully"},
            status=status.HTTP_200_OK
        )
