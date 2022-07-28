import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as questionOptionController from "./controllers/questionOptionController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizApi from "./apis/quizApi.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";


const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:id/questions", questionController.addQuestion);

router.get("/topics/:tId/questions/:qId", questionOptionController.listOptions);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionOptionController.deleteOption);
router.post("/topics/:tId/questions/:qId/options", questionOptionController.addOption);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.chooseQuizQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuizQuestion); // problem of this leaking in
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.gradeChoice);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/api/questions/random", quizApi.giveRandomQuestion);


export { router };
