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
            'accepted_answer',
        )
