from rest_framework import serializers
from .models import User, Question, Answer, StarTracker


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = (
            'question',
            'text',
            'author',
            'time_created',
        )


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            'title',
            'text',
            'author',
            'time_created',
            'answers',
        )

        read_only_fields = ('author',)
