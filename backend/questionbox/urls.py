from django.urls import path
from questionbox import views


urlpatterns = [
    path('', views.QuestionList.as_view()),
    path('questions/<int:pk>/answers', views.CreateAnswer.as_view()),
    path('questions/<int:pk>', views.QuestionDetails.as_view()),
    path('users/questions', views.ListUserQuestions.as_view()),
    path('users/answers', views.ListUserAnswers.as_view()),
    path('search', views.QuestionSearch.as_view(), name='question-search'),
    path('profile/<int:pk>', views.UserDetailView.as_view()),
    path('questions/favorite', views.favorite_question),
    path('answers/favorite', views.favorite_answer),
    path('answers/<int:pk>/accepted', views.AcceptAnswer.as_view()),
    path('users/fav-questions', views.ListFavoriteQuestions.as_view()),
]
