# Project 2: Spaced Repetition - SpaceGrow
Name of Application: SpaceGrow

## Description
This is my second project for the course Web Software Development. 

It implements a web-service that allows users to contribute and utilize a shared study question bank on various topics. Users are able to add their own questions and question answers to the question bank and study them using the quiz feature. Additionally, the app provides a cross-origin resource sharing (CORS) API which permites cross-origin requests from users/clients across the net. 

## Location
The project has been deployed using heroku at the following address: https://spacegrow.herokuapp.com/

## Running the App locally
1. Clone this repository (download this zip file)
2. Ensure that your previous Docker containers and images are discarded
3. Change the code that assigns the ports (for connection with DB)
4. Run the command `docker-compose up` at the root directory
5. Access the application using a browser at `http://localhost:7777`

## Running Tests
Use the following command at the root of the project directory `deno test --allow-all`. Note: The latest deno version may be quite buggy with testing.

## Project Structure
```
.
├── Dockerfile
├── Procfile
├── app.js
├── config
│   └── readme.txt
├── database
│   └── database.js
├── deps.js
├── middlewares
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── renderMiddleware.js
│   └── serveStaticMiddleware.js
├── routes
│   ├── apis
│   │   ├── quizApi.js
│   │   └── readme.txt
│   ├── controllers
│   │   ├── loginController.js
│   │   ├── mainController.js
│   │   ├── questionController.js
│   │   ├── questionOptionController.js
│   │   ├── quizController.js
│   │   ├── registrationController.js
│   │   ├── statisticsController.js
│   │   └── topicController.js
│   └── routes.js
├── run-locally.js
├── services
│   ├── answerService.js
│   ├── questionOptionService.js
│   ├── questionService.js
│   ├── readme.txt
│   ├── statisticsService.js
│   ├── topicService.js
│   └── userService.js
├── static
│   └── readme.txt
├── tests
│   ├── compiled_test.js
│   ├── quizApi_test.js
│   └── readme.txt
└── views
    ├── correct.eta
    ├── incorrect.eta
    ├── layouts
    │   └── layout.eta
    ├── login.eta
    ├── main.eta
    ├── no_question.eta
    ├── partials
    │   ├── footer.eta
    │   ├── header.eta
    │   └── readme.txt
    ├── question_options.eta
    ├── quizStart.eta
    ├── quiz_question.eta
    ├── register.eta
    ├── topic_questions.eta
    └── topics.eta

12 directories, 48 files
```