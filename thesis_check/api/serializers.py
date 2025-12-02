from rest_framework import serializers
from checking.models import ThesisSubmission

class ThesisSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThesisSubmission
        fields = '__all__'
