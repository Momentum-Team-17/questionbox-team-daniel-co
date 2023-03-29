from django.urls import path
from questionbox import views


urlpatterns = [
    path('', views.QuestionList.as_view()),
    path('<int:pk>/answer', views.CreateAnswer.as_view()),
]
