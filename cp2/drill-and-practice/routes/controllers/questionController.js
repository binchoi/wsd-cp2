import * as questionService from "../../services/questionService.js";

const addQuestion = async ({ params, request, response }) => {
  const body = request.body({ type: "form" });
  const pp = await body.value;

  await questionService.addQuestion(
    1, // user id
    params.id, // topic_id
    pp.get("question_text"), // question_text
  );

  // validation

  response.redirect("/topics/"+params.id);
};

const listQuestions = async ({ params, render }) => {
  render("topic_questions.eta", { topic_id: params.id, questions: await questionService.listQuestions(params.id) });
};

export { addQuestion, listQuestions };