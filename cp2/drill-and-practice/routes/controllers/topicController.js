import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};


const addTopic = async ({ request, response, user, render }) => {
  if (!user.admin) {
    response.redirect("/topics");
  } else {
    const topicData = await getTopicData(request);
    const [passes, errors] = await validasaur.validate(topicData, validationRules);
    if (!passes) {
      topicData.validationErrors = errors;
      topicData.user = user;
      topicData.topics = await topicService.listTopics();
      render("topics.eta", topicData);
    } else {
      await topicService.addTopic(
        user.id,
        topicData.name,
      );
      response.redirect("/topics");
    }
  }
};

const listTopics = async ({ render, user }) => {
  render("topics.eta", { topics: await topicService.listTopics(), user: user });
};

const deleteTopic = async ({ params, response, user }) => {
  if (user.admin) {
    await topicService.deleteTopic(params.id);
  }
  response.redirect("/topics");
};

export { addTopic, listTopics, deleteTopic };