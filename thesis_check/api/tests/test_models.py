from django.test import TestCase
from api.models import Submission

class SubmissionModelTest(TestCase):
    def test_create_submission(self):
        sub = Submission.objects.create(title="AI Thesis", student="Burak", score=90)
        self.assertEqual(sub.title, "AI Thesis")
        self.assertEqual(sub.student, "Burak")
        self.assertTrue(sub.pk is not None)
