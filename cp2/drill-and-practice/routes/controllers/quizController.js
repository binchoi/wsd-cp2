
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as questionOptionService from "../../services/questionOptionService.js";
import * as answerService from "../../services/answerService.js";

const listTopics = async ({ render }) => {
	render("quizStart.eta", {topics: await topicService.listTopics() });
};

const chooseQuizQuestion = async ({ params, render, response }) => {
	const randomQuestion = await questionService.getRandQuestion(params.tId);
	if (randomQuestion.length<1) {
		render("no_question.eta", {tId: params.tId});
	} else {
		response.redirect(`/quiz/${params.tId}/questions/${randomQuestion[0].id}`);
	}
};

const showQuizQuestion = async ({ params, render }) => { // why here? everything shuts down.... find out.
	render("quiz_question.eta", {
		question: await questionService.getQuestionById(params.qId), 
		options: await questionOptionService.listOptions(params.qId),
		tId: params.tId, 
	});
};

const gradeChoice = async ({ params, response, user }) => {
	await answerService.addAnswerRecord(user.id, params.qId, params.oId);
	const option = await questionOptionService.getOptionById(params.oId);
	response.redirect(`/quiz/${params.tId}/questions/${params.qId}/${option.is_correct ? "correct" : "incorrect"}`);
};

const showCorrect = async ({ params, render }) => {
	render("correct.eta", {
		tId: params.tId, 
	});
};

const showIncorrect = async ({ params, render }) => {
	let corr = await questionOptionService.getCorrectOption(params.qId);
	if (corr==undefined) {
		corr = {option_text: "No correct answer yet"};
	}
	render("incorrect.eta", {
		tId: params.tId, 
		correctOption: corr, 
	});
};



export { listTopics, chooseQuizQuestion, showQuizQuestion, gradeChoice, showCorrect, showIncorrect };

