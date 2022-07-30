import * as questionOptionService from "../../services/questionOptionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: params.has("is_correct"),
  };
};

const addOption = async ({ render, user, params, request, response }) => {
  const optionData = await getOptionData(request);
  const [passes, errors] = await validasaur.validate(optionData, validationRules);
  if (!passes) {
    optionData.validationErrors = errors;
    optionData.topic_id = params.tId;
    optionData.question = await questionService.getQuestionById(params.qId);
    optionData.question_id = params.qId;
    optionData.options = await questionOptionService.listOptions(params.qId);
    render("question_options.eta", optionData);
  } else {
    await questionOptionService.addOption(
      params.qId, // question_id
      optionData.option_text, // option_text
      optionData.is_correct, // is_correct
    );
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
  }
};

const listOptions = async ({ params, render }) => {
  const question = await questionService.getQuestionById(params.qId);
  render("question_options.eta", { topic_id: params.tId, question: question, question_id: params.qId, options: await questionOptionService.listOptions(params.qId) });
};

const deleteOption = async ({ params, response }) => {
  await questionOptionService.deleteOption(params.oId);
  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { addOption, listOptions, deleteOption };