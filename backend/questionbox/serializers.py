from rest_framework import serializers
from .models import User, Question, Answer, StarTracker


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
    answers = AnswerSerializer(many=True, read_only=True)
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
