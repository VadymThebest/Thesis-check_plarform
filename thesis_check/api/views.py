from rest_framework import generics, status
from rest_framework.response import Response
from checking.models import ThesisSubmission
from .serializers import ThesisSubmissionSerializer
from .nlp import run_plagiarism_and_grammar_check

# Tez yükleme API'si
class UploadThesisView(generics.CreateAPIView):
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save(status="processing")

            # Run plagiarism and grammar check
            result = run_plagiarism_and_grammar_check(submission.file.path)
            submission.plagiarism_score = result["plagiarism"]
            submission.grammar_issues = result["grammar"]
            submission.citations_missing = result["citations"]
            submission.status = "completed"
            submission.save()

            return Response(ThesisSubmissionSerializer(submission).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Tez sonucu görüntüleme API'si
class ThesisResultView(generics.RetrieveAPIView):
    queryset = ThesisSubmission.objects.all()
    serializer_class = ThesisSubmissionSerializer
    lookup_field = 'id'  # <- bu doğru, id ile sorgulama yapar
