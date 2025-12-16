from rest_framework import serializers
from checking.models import ThesisSubmission

class ThesisSubmissionSerializer(serializers.ModelSerializer):
    student_email = serializers.EmailField(source="student.email", read_only=True)

    class Meta:
        model = ThesisSubmission
        fields = "__all__"
