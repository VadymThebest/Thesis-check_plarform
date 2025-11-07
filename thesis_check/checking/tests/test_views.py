from django.test import TestCase
from django.urls import reverse

class CheckingViewsTest(TestCase):
    def test_upload_page(self):
        response = self.client.get(reverse('checking-upload'))
        self.assertEqual(response.status_code, 200)
