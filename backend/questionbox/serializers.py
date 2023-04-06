from rest_framework import serializers
from django.core.paginator import Paginator
from .models import User, Question, Answer


class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='username')
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = (
            'pk',
            'question',
            'text',
            'author',
            'time_created',
            'is_accepted',
            'is_favorite'
        )

        read_only_fields = ('author', 'question')

    def get_is_favorite(self, answer):
        try:
            if self.context['request'].user.is_authenticated:
                return answer.fav_users.filter(
                    pk=self.context['request'].user.pk).exists()
        except AttributeError:
            return False
        except KeyError:
            try:
                if self.context['parent']['request'].user.is_authenticated:
                    return answer.fav_users.filter(
                        pk=self.context['parent']['request'].user.pk).exists()
            except AttributeError:
                return False
        return False


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField('paginated_answers')
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='username')
    accepted_answer = AnswerSerializer(
        read_only=True, many=False
    )
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = (
            'pk',
            'title',
            'text',
            'author',
            'time_created',
            'answers',
            'accepted_answer',
            'is_favorite',
        )

        read_only_fields = ('author',)

    def paginated_answers(self, obj):
        page_size = 10
        paginator = Paginator(obj.answers.all(), page_size)
        answers = paginator.page(1)
        serializer = AnswerSerializer(
            answers, many=True,  context={'parent': self.context})
        return serializer.data

    def get_is_favorite(self, question):
        try:
            if self.context['request'].user.is_authenticated:
                return question.fav_users.filter(
                    pk=self.context['request'].user.pk).exists()
        except AttributeError:
            return False
        return False


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
