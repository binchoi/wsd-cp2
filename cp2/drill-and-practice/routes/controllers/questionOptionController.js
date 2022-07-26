import * as questionOptionService from "../../services/questionService.js";

const addQuestionOption = async ({ params, request, response }) => {
  const body = request.body({ type: "form" });
  const pp = await body.value;

  await questionService.addQuestion(
    params.qId, // question_id
    pp.get("option_text"), // option_text
    pp.has("is_correct"), // is_correct
  );

  // validation

  response.redirect(`/topics/${params.id}/questions/${params.qId};`);
};

const listQuestions = async ({ params, render }) => {
  render("topic_questions.eta", { topic_id: params.id, questions: await questionService.listQuestions(params.id) });
};

export { addQuestion, listQuestions };