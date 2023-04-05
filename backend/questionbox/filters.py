from django_filters import rest_framework as filters
from .models import Question


class QuestionFilter(filters.FilterSet):
    has_accepted_answer = filters.NumberFilter(name='has_accepted_answer')

    class Meta:
        model = Question
        fields = ['has_accepted_answer', ]
