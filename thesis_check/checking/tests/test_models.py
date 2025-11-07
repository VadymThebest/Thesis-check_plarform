from django.test import TestCase
from checking.models import Report

class ReportModelTest(TestCase):
    def test_create_report(self):
        report = Report.objects.create(name="Similarity Report", score=85)
        self.assertEqual(report.name, "Similarity Report")
        self.assertEqual(report.score, 85)
