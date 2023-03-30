from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    fav_questions = models.ManyToManyField(
        to='Question', related_name='users', blank=True, null=True)
    fav_answers = models.ManyToManyField(
        to='Answer', related_name='users', blank=True, null=True)


class Question(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=5000)
    author = models.ForeignKey(to='User', on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)
    # accepted_answer = models.OneToOneField(
    #     to='Answer', on_delete=models.CASCADE, blank=True, null=True, related_name='accepted_for')

    class Meta:
        ordering = ['-time_created']

    @property
    def accepted_answer(self):
        accepted_answer = None
        for answer in self.answers.all():
            if answer.is_accepted:
                accepted_answer = answer
        return accepted_answer

    def __str__(self):
        return f'{self.title} asked by {self.author}'


class Answer(models.Model):
    question = models.ForeignKey(
        to='Question', on_delete=models.CASCADE, related_name='answers')
    text = models.TextField(max_length=5000)
    author = models.ForeignKey(to='User', on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-time_created']

        def __str__(self):
            return f'{self.question} answer by {self.author}'


class StarTracker(models.Model):
    star = models.BooleanField(default=False)
    user = models.ForeignKey(to='User', on_delete=models.CASCADE)
    question = models.ForeignKey(to='Question', on_delete=models.CASCADE)
    answer = models.ForeignKey(to='Answer', on_delete=models.CASCADE)

    class Meta:
        models.UniqueConstraint(
            fields=['user', 'question', 'answer'], name='tracker_constraint')
