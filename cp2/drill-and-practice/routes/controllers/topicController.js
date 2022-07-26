import * as topicService from "../../services/topicService.js";

const addTopic = async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  await topicService.addTopic(
    1,
    params.get("name"),
  );

  response.redirect("/topics");
};

const listTopics = async ({ render }) => {
  render("topics.eta", { topics: await topicService.listTopics() });
};

const deleteTopic = async ({ params, response }) => {
  await topicService.deleteTopic(params.id);
  response.redirect("/topics");
};

export { addTopic, listTopics, deleteTopic };