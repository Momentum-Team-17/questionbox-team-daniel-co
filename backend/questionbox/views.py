import json
from rest_framework import generics, filters
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from django.core.serializers import serialize
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render, get_object_or_404
from .models import User, Question, Answer, StarTracker
from .serializers import QuestionSerializer, AnswerSerializer, UserSerializer
from .permissions import IsAuthor


# Create your views here.
class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated()]


class ListUserQuestions(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Question.objects.filter(author__id=user.id)
        return queryset


class CreateAnswer(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        question = get_object_or_404(Question, pk=self.kwargs["pk"])
        serializer.save(author=self.request.user, question=question)


class ListUserAnswers(generics.ListAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Answer.objects.filter(author__id=user.id)
        return queryset


class QuestionDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated(), IsAuthor()]


class QuestionSearch(generics.ListAPIView):
    serializer_class = QuestionSerializer
    model = Question
    context_object_name = "questions"

    def get_queryset(self):
        query = self.request.GET.get('q')
        if query:
            return Question.objects.filter(text__icontains=query)
        return Question.objects.all()


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    model = User
    queryset = User.objects.all()


@api_view(['PATCH'])
@permission_classes((IsAuthenticated, ))
def favorite_question(request):
    question_pk = request.data.get('question_pk')
    question = get_object_or_404(Question, pk=question_pk)
    if question in request.user.fav_questions.all():
        request.user.fav_questions.remove(question)
        request.user.save()
    else:
        request.user.fav_questions.add(question)
        request.user.save()

    favorite_questions = serialize('json', request.user.fav_questions.all())
    favorite_questions = json.loads(favorite_questions)
    return Response(favorite_questions)
