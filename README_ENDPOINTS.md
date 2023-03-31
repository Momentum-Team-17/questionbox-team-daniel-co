Endpoints:

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

auth/token/login/ ----> POST - logs out user (removes user authentication token)


- Our app's urls:

'' (homepage) ----> GET | POST - QuestionList - anyone can see list of questions; authenticated user can post a question

questions/<int:pk>/answers ----> POST - CreateAnswer view - aunthenticated user can post an answer

questions/<int:pk> ----> GET | PUT | PATCH | DELETE - QuestionDetail view - authenticated user can see details + answers to a question; author of that question can update/delete




 