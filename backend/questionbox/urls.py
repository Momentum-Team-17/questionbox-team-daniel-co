from django.urls import path
from questionbox import views


urlpatterns = [
    path('', views.QuestionList.as_view()),
    path('questions/<int:pk>/answers', views.CreateAnswer.as_view()),
]
