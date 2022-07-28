
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as questionOptionService from "../../services/questionOptionService.js";

const listTopics = async ({ render }) => {
	render("quizStart.eta", {topics: await topicService.listTopics() });

};

const chooseQuizQuestion = async ({ params, render, response }) => {
	const randomQuestion = await questionService.getRandQuestion(params.tId);
	if (randomQuestion.length<1) {
		render("no_question.eta", {tId: params.tId});
		// response.message = "There are no questions for this topic as of yet :-(";
	} else {
		response.redirect(`/quiz/${params.tId}/questions/${randomQuestion[0].id}`);
	}
};

const showQuizQuestion = async ({ params, render }) => {
	render("quiz_question.eta", {
		question: await questionService.getQuestionById(params.qId), 
		options: await questionOptionService.listOptions(params.qId),
		tId: params.tId, 
	});
};

const gradeChoice = async ({ params, response }) => {
	const option = await questionOptionService.getOptionById(params.oId);
	response.redirect(`/quiz/${params.tId}/questions/${params.qId}/${option.is_correct ? "correct" : "incorrect"}`);
	// if (option.is_correct) {
	// 	response.redirect(`/quiz/${params.tId}/questions/${randomQuestion[0].id}`);
	// } else {
	// 	response.redirect(`/quiz/${params.tId}/questions/${randomQuestion[0].id}`);
	// }
};

export { listTopics, chooseQuizQuestion, showQuizQuestion, gradeChoice };

