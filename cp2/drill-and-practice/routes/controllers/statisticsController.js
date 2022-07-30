import * as statisticsService from "../../services/statisticsService.js";

const getStatistics = async ({ render }) => {
  let data = {
    topicCount: await statisticsService.topicCount(),
    questionCount: await statisticsService.questionCount(),
    answerCount: await statisticsService.answerCount(),
  }
  render("main.eta", data);
};

export { getStatistics };
