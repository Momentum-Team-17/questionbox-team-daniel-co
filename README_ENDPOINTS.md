Endpoints:

Deployed Render url - https://questionbox-mgxz.onrender.com

- Below are Djoser endpoints with a link to the Djoser docs. You likely will not need many of these, but we wanted to provide them just in case.
  
'api-auth/' ----> Adds "Login" button to pages

https://djoser.readthedocs.io/en/latest/base_endpoints.html#user

auth/users/ ----> POST - registers new user

auth/users/activation/ ----> POST - activates user account (not directly exposed to users)

auth/users/resend_activation/ ----> POST - resends activation email

auth/users/me/ ----> GET | PUT | PATCH | DELETE - retreives/updates/deletes the authenticated user

auth/users/set_{USERNAME_FIELD}/ ----> POST - changes user’s USERNAME_FIELD. By default this changes the username.

auth/users/reset_{USERNAME_FIELD}/ ----> POST - emails user with username reset link

auth/users/set_password/ ----> POST - changes user password

auth/token/login ---> POST - obtains user authentication token

auth/token/logout/ ----> POST - logs out user (removes user authentication token)


- Our app's urls:

'' (homepage) ----> GET | POST - QuestionList - anyone can see list of questions; authenticated user can post a question

questions ----> POST - CreateQuestion view - authenticated user can post a question

questions/<int:pk>/answers ----> POST - CreateAnswer view - aunthenticated user can post an answer

questions/<int:pk> ----> GET | PUT | PATCH | DELETE - QuestionDetail view - authenticated user can see details + answers to a question; author of that question can update/delete

answers/<int:pk> ----> GET | PUT | PATCH | DELETE - AnswerDetail view - authenticated user can see details to an answer; author of that answer can update/delete

users/questions ----> GET - shows list of qeustions created by the current user

users/answers ----> GET - shows list of answers created by the current user

search ----> GET - search the text field of Questions

profile/<slug:username> ----> GET - shows user details with details of their authored questions and answers

questions/favorite ----> PATCH - adds (favorites) or removes (un-favorites) question from user's fav_questions (the request requires a question_pk) -- <question_pk:pk>

answers/favorite ----> PATCH - adds (favorites) or removes (un-favorites) an answer from user's fav_answers (the request requires and answer pk) -- <answer_pk:pk>
 
answers/<int:pk>/accepted ----> PATCH - allows the author of a question to mark a related answer as 'accepted' (actually allows this user to PATCH any field of the answer, but we only want this endpoint for marking 'is_accepted')

users/fav-questions ----> GET - lists current logged-in user's favorite questions

users/fav-answers ----> GET - lists current loggen-in user's favorite answers

questions/answered ----> GET - lists questions that have an accepted answer

questions/unanswered ----> GET - lists questions that do not have an accepted answer

profile/<slug:username> ----> GET - shows details for one user
