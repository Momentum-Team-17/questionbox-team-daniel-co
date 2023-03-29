from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import User, Question, Answer, StarTracker
from .serializers import QuestionSerializer


# Create your views here.
class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated()]
