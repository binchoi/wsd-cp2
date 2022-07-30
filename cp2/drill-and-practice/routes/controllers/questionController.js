import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ render, user, params, request, response }) => {
  const questionData = await getQuestionData(request);
  const [passes, errors] = await validasaur.validate(questionData, validationRules);
  if (!passes) {
    questionData.validationErrors = errors;
    questionData.user = user;
    questionData.topic_id = params.id;
    questionData.questions = await questionService.listQuestions(params.id);
    render("topic_questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id, // user id
      params.id, // topic_id
      questionData.question_text, // question_text
    );
    response.redirect("/topics/"+params.id);
  }
};

const listQuestions = async ({ params, render }) => {
  render("topic_questions.eta", { topic_id: params.id, questions: await questionService.listQuestions(params.id) });
};

const deleteQuestion = async ({ params, response }) => {
  await questionService.deleteQuestion(params.qId);
  response.redirect(`/topics/${params.tId}`);
};


export { addQuestion, listQuestions, deleteQuestion };