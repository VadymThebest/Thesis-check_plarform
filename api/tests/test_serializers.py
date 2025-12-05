from django.test import TestCase
from django.contrib.auth import get_user_model
from checking.models import ThesisSubmission
from api.serializers import ThesisSubmissionSerializer  # doğru import

User = get_user_model()

class ThesisSubmissionSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="StrongPass123!"
        )
        self.thesis = ThesisSubmission.objects.create(
            student=self.user,
            status="processing"
        )

    def test_serializer_fields(self):
        serializer = ThesisSubmissionSerializer(instance=self.thesis)
        data = serializer.data

        # serializer ReturnDict dönüyor
        self.assertIsInstance(data, dict)
        self.assertIn("id", data)
        self.assertIn("student", data)
        self.assertIn("status", data)
        self.assertIn("file", data)
        self.assertIn("plagiarism_score", data)
        self.assertIn("grammar_issues", data)
        self.assertIn("citations_missing", data)

    def test_serializer_content(self):
        serializer = ThesisSubmissionSerializer(instance=self.thesis)
        data = serializer.data

        self.assertEqual(data["student"], self.user.id)
        self.assertEqual(data["status"], "processing")
        self.assertIsNone(data["plagiarism_score"])
        self.assertIsNone(data["grammar_issues"])
        self.assertIsNone(data["citations_missing"])
