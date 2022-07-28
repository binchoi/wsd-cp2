
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const listTopics = async ({ render }) => {
	render("quizStart.eta", {topics: await topicService.listTopics() });

};

const chooseQuizQuestion = async ({ params, render, response }) => {
	const randomQuestion = await questionService.getRandQustion(params.id);
	if (randomQuestion.length<1) {
		response.message = "There are no questions for this topic as of yet :-(";
	} else {
		response.redirect(`/topics/${params.id}/questions/${randomQuestion[0].id}`)
	}
};

// showQuizQuestion
		//render("topic_questions.eta", { topic_id: params.id, question: randomQuestion });
export { listTopics, chooseQuizQuestion };

