from django.test import TestCase
from django.urls import reverse

class ApiViewsTest(TestCase):
    def test_api_list_view(self):
        response = self.client.get(reverse('api-list'))
        self.assertEqual(response.status_code, 200)

    def test_api_create_view(self):
        data = {'title': 'New Thesis', 'author': 'Burak'}
        response = self.client.post(reverse('api-create'), data)
        self.assertIn(response.status_code, [200, 201])
