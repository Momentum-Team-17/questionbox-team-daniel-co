from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @permission_classes(IsAuthenticated)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
