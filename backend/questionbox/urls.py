from django.urls import path
from questionbox import views


urlpatterns = [
    # GET
    path('', views.QuestionList.as_view()),
    path('questions/answered', views.AnsweredQuestions.as_view()),
    path('questions/unanswered', views.UnansweredQuestions.as_view()),
    path('search', views.QuestionSearch.as_view(), name='question-search'),

    # POST
    path('questions', views.CreateQuestion.as_view()),
    path('questions/<int:pk>/answers', views.CreateAnswer.as_view()),

    # PATCH
    path('answers/<int:pk>/accepted', views.AcceptAnswer.as_view()),
    path('questions/favorite', views.favorite_question),
    path('answers/favorite', views.favorite_answer),

    # GET
    path('users/fav-questions', views.ListFavoriteQuestions.as_view()),
    path('users/fav-answers', views.ListFavoriteAnswers.as_view()),
    path('users/questions', views.ListUserQuestions.as_view()),
    path('users/answers', views.ListUserAnswers.as_view()),

    # GET | PUT | PATCH | DELETE
    path('questions/<int:pk>', views.QuestionDetails.as_view()),
    path('answers/<int:pk>', views.AnswerDetails.as_view()),

    # GET
    path('profile/<slug:username>', views.UserDetailView.as_view()),
]
