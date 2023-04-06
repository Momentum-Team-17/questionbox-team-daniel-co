from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.constraints import UniqueConstraint


class User(AbstractUser):
    fav_questions = models.ManyToManyField(
        to='Question', related_name='fav_users', blank=True, null=True)
    fav_answers = models.ManyToManyField(
        to='Answer', related_name='fav_users', blank=True, null=True)


class Question(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=5000)
    author = models.ForeignKey(
        to='User', on_delete=models.CASCADE, related_name='user_questions')
    time_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-time_created']
        constraints = [
            UniqueConstraint(
                fields=['text', 'author'], name='question_constraints')
        ]

    @property
    def accepted_answer(self):
        accepted_answer = None
        for answer in self.answers.all():
            if answer.is_accepted:
                accepted_answer = answer
        return accepted_answer

    def __str__(self):
        return str(self.pk)
        # return f'{self.title} asked by {self.author}'


class Answer(models.Model):
    question = models.ForeignKey(
        to='Question', on_delete=models.CASCADE, related_name='answers')
    text = models.TextField(max_length=5000)
    author = models.ForeignKey(
        to='User', on_delete=models.CASCADE, related_name='user_answers')
    time_created = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-time_created']
        constraints = [
            UniqueConstraint(
                fields=['text', 'author', 'question'], name='answer_constraints')
        ]

    def __str__(self):
        # return f'{self.question} answer by {self.author}'
        return str(self.pk)
