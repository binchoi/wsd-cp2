import { executeQuery } from "../database/database.js";

const topicCount = async () => {
  const res = await executeQuery(
    `SELECT count(*) FROM topics` ////something wrong -> undefined
  );
  return res.rows[0].count;
};

const questionCount = async () => {
  const res = await executeQuery(
    `SELECT count(*) FROM questions`
  );
  return res.rows[0].count;
};

const answerCount = async () => {
  const res = await executeQuery(
    `SELECT count(*) FROM question_answers`
  );
  return res.rows[0].count;
};

export { topicCount, questionCount, answerCount };