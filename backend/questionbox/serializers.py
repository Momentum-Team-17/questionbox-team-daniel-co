from rest_framework import serializers
from .models import User, Question, Answer, StarTracker


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = (
            'title',
            'text',
            'author',
            'time_created',
        )


class AnswerSerializer(serializers.ModelSerializer):
    # question = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = (
            'question',
            'text',
            'author',
            'time_created',
        )
