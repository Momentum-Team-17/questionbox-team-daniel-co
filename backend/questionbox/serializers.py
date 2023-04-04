from rest_framework import serializers
from rest_framework.settings import api_settings
from django.core.paginator import Paginator
from .models import User, Question, Answer


class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='username')

    class Meta:
        model = Answer
        fields = (
            'pk',
            'question',
            'text',
            'author',
            'time_created',
        )

        read_only_fields = ('author', 'question')


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField('paginated_answers')
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='username')

    class Meta:
        model = Question
        fields = (
            'pk',
            'title',
            'text',
            'author',
            'time_created',
            'answers',
        )

        read_only_fields = ('author',)

    def paginated_answers(self, obj):
        page_size = 10
        paginator = Paginator(obj.answers.all(), page_size)
        answers = paginator.page(1)
        serializer = AnswerSerializer(answers, many=True)
        return serializer.data


class UserSerializer(serializers.ModelSerializer):
    user_questions = QuestionSerializer(many=True)
    user_answers = AnswerSerializer(many=True)
    fav_questions = QuestionSerializer(many=True)
    fav_answers = AnswerSerializer(many=True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'user_questions',
            'user_answers',
            'fav_questions',
            'fav_answers',
        )
