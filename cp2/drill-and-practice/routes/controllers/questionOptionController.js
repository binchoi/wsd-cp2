import * as questionOptionService from "../../services/questionOptionService.js";

const addOption = async ({ params, request, response }) => {
  const body = request.body({ type: "form" });
  const pp = await body.value;

  await questionOptionService.addOption(
    params.qId, // question_id
    pp.get("option_text"), // option_text
    pp.has("is_correct"), // is_correct
  );

  // validation
  
  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const listOptions = async ({ params, render }) => {
  render("question_options.eta", { topic_id: params.tId, question_id: params.qId, options: await questionOptionService.listOptions(params.qId) });
};

const deleteOption = async ({ params, response }) => {
  await questionOptionService.deleteOption(params.oId);
  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { addOption, listOptions, deleteOption };