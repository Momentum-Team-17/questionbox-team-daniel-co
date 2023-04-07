
import random
import requests
import json
# questions = [
#     {
#         'token': 'token',
#         'pk': 1,
#         "title": "question title",
#         'text': 'question text',
#         "answers": [
#             "answer text",
#             'answer two text'
#         ]
#     },
# ]


tokens = [
    '1c97eb6f620a5bcc464effeb140d7e4d993b2ba4',
    '3b0b0512c6c81f06443a2410bc1a69c5bfc93c19',
    'bbddb342d91a41173cdedb9dfd56f83f09063992'
]

questions = [
    {
        'token': random.choice(tokens),
        'pk': 14,
        'title': 'Django MVT Architecture',
        'text': 'What is the Model-View-Template (MVT) architecture in Django?',
        'answers': [
            'It is a software design pattern that separates the application logic into three interconnected components: Model, View, and Template.',
            'It is a database schema that defines the structure of the data and the relationships between tables.',
            'It is a user interface (UI) design pattern that organizes content into separate sections or pages.',
            'It is a server-side scripting language for web development.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 15,
        'title': 'React Native vs Native Development',
        'text': 'What is the difference between developing a mobile app using React Native and developing a native app?',
        'answers': [
            'React Native allows for faster development with a single codebase, but native apps have better performance and more access to device hardware and features.',
            'React Native and native apps have the same performance and access to device hardware and features.',
            'Native app development is easier than React Native development.',
            'React Native can only be used for Android app development.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 17,
        'title': 'React Hooks',
        'text': 'What are React Hooks?',
        'answers': [
            'They are functions that let you use state and other React features without writing a class.',
            'They are lifecycle methods available in React components.',
            'They are a way to define custom event handlers in React.',
            'They are a way to manage the routing in a React application.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 18,
        'title': 'React Components',
        'text': 'What are React Components?',
        'answers': [
            'They are reusable UI building blocks that can be composed to create complex UIs.',
            'They are a way to define the structure and behavior of data models in React.',
            'They are a tool for managing version control in a React project.',
            'They are a way to define custom event handlers in React.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 28,
        'title': 'React Virtual DOM',
        'text': 'What is the Virtual DOM in React?',
        'answers': [
            'It is an in-memory representation of the actual DOM, created by React to optimize rendering performance.',
            'It is a separate thread in the browser that runs JavaScript code in parallel to the main thread.',
            'It is a tool used to analyze the performance of React components.',
            'It is a way to define custom event handlers in React.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 29,
        'title': 'Django Forms',
        'text': 'What are Django Forms?',
        'answers': [
            'They are a high-level abstraction for handling user input and validation in a web application.',
            'They are a way to define the structure and behavior of data models in Django.',
            'They are a tool for managing version control in a Django project.',
            'They are a way to define custom routing rules in a Django application.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 21,
        'title': 'React Props vs State',
        'text': 'What is the difference between React props and state?',
        'answers': [
            'Props are read-only and are used to pass data from a parent component to a child component, while state is used to manage internal component data that can change over time.',
            'State is read-only and is used to pass data from a parent component to a child component, while props is used to manage internal component data that can change over time.',
            'Props and state are the same thing in React.',
            'Props and state are both used to manage internal component data that can change over time.'
        ]
    },
    {
        'token': random.choice(tokens),
        'pk': 22,
        'title': 'Django Middleware',
        'text': 'What is Django Middleware?',
        'answers': [
            'It is a way to add extra functionality to the request/response processing flow in a Django application.',
            'It is a tool for managing database migrations in a Django project.',
            'It is a template language used to generate HTML in a Django application.',
            'It is a way to define custom routing rules in a Django application.'
        ]
    }
]


for question in questions:
    for answer in question['answers']:
        url = f"https://questionbox-mgxz.onrender.com/questions/{question['pk']}/answers"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Token {question["token"]}'
        }
        data = {
            'text': answer,
        }
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if response.status_code == 200:
            # print response content (API response data)
            print(response.json())

        # else:
        #     # print error message (API error message)
        #     print(response.json()['message'])
