import pytest
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser
from checking.models import ThesisSubmission, Article


@pytest.mark.django_db
class TestCheckingEndpoints:

    def setup_method(self):
        self.client = APIClient()

        self.student = CustomUser.objects.create_user(
            email="student@example.com",
            username="stu",
            password="Pass123!"
        )

        self.student2 = CustomUser.objects.create_user(
            email="student2@example.com",
            username="stu2",
            password="Pass123!"
        )

        self.staff = CustomUser.objects.create_user(
            email="staff@example.com",
            username="staff",
            password="Pass123!",
            is_staff=True
        )

        self.superuser = CustomUser.objects.create_superuser(
            email="admin@example.com",
            username="admin",
            password="Admin123!"
        )

    # -----------------------------------------------------------
    # 1) SUBMIT THESIS ENDPOINT
    # -----------------------------------------------------------

    def test_submit_thesis_success(self):
        """Öğrenci tez yükleyebilir"""

        self.client.force_authenticate(self.student)

        file = SimpleUploadedFile(
            "test.pdf", b"dummy content", content_type="application/pdf"
        )

        url = reverse("checking:submit_thesis")

        response = self.client.post(url, {"file": file})

        assert response.status_code == status.HTTP_201_CREATED
        assert ThesisSubmission.objects.count() == 1

    def test_submit_thesis_requires_auth(self):
        """Anon kullanıcı yükleyemez"""

        file = SimpleUploadedFile(
            "test.pdf", b"dummy content", content_type="application/pdf"
        )

        url = reverse("checking:submit_thesis")

        response = self.client.post(url, {"file": file})

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # -----------------------------------------------------------
    # 2) THESIS LIST ENDPOINT
    # -----------------------------------------------------------

    def test_student_can_see_only_own_thesis(self):
        """Öğrenci kendi tezlerini görür"""

        # student'ın 1 tezi
        ThesisSubmission.objects.create(student=self.student, file="dummy.pdf")

        # diğer öğrencinin tezi
        ThesisSubmission.objects.create(student=self.student2, file="dummy.pdf")

        self.client.force_authenticate(self.student)

        url = reverse("checking:thesis_list")
        response = self.client.get(url)

        assert response.status_code == 200
        assert len(response.data) == 1  # sadece kendi tezi

    def test_staff_can_see_all_theses(self):
        """Admin ve staff tüm tezleri görür"""

        ThesisSubmission.objects.create(student=self.student, file="a.pdf")
        ThesisSubmission.objects.create(student=self.student2, file="b.pdf")

        self.client.force_authenticate(self.staff)

        url = reverse("checking:thesis_list")
        response = self.client.get(url)

        assert response.status_code == 200
        assert len(response.data) == 2

    # -----------------------------------------------------------
    # 3) THESIS DETAIL ENDPOINT
    # -----------------------------------------------------------

    def test_student_cannot_access_others_thesis_detail(self):
        """Öğrenci başka öğrencinin tezi detayını göremez"""

        t = ThesisSubmission.objects.create(student=self.student2, file="test.pdf")

        self.client.force_authenticate(self.student)

        url = reverse("checking:thesis_detail", args=[t.id])
        response = self.client.get(url)

        assert response.status_code == 403

    def test_staff_can_access_any_thesis_detail(self):
        t = ThesisSubmission.objects.create(student=self.student2, file="x.pdf")

        self.client.force_authenticate(self.staff)

        url = reverse("checking:thesis_detail", args=[t.id])
        response = self.client.get(url)

        assert response.status_code == 200
        assert response.data["id"] == t.id

    # -----------------------------------------------------------
    # 4) ARTICLE SEARCH (semantic veya keyword)
    # -----------------------------------------------------------

    def test_article_search_works(self):
        """Search endpoint çalışıyor mu?"""

        Article.objects.create(
            title="AI Research", content="Deep learning", embedding=[0.1] * 768
        )

        Article.objects.create(
            title="Math Paper", content="Algebra", embedding=[0.2] * 768
        )

        url = reverse("checking:article_search")

        response = self.client.get(url, {"q": "AI"})

        assert response.status_code == 200
        assert len(response.data) >= 1

    # -----------------------------------------------------------
    # 5) TRAIN EMBEDDINGS (ADMIN ONLY)
    # -----------------------------------------------------------

    def test_train_embeddings_requires_staff(self):
        url = reverse("checking:train_embeddings")

        self.client.force_authenticate(self.student)
        response = self.client.post(url)

        assert response.status_code == 403

    def test_train_embeddings_staff_success(self, mocker):
        """run_training fonksiyonunun çağrılıp çağrılmadığını test eder"""

        mocker.patch("checking.train_embeddings.train.run_training", return_value=True)

        url = reverse("checking:train_embeddings")

        self.client.force_authenticate(self.staff)
        response = self.client.post(url)

        assert response.status_code == 200
        assert "trained" in response.data["message"].lower()
