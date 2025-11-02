from rest_framework import serializers
from checking.models import ThesisSubmission

class ThesisSubmissionSerializer(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = ThesisSubmission
        fields = '__all__'
