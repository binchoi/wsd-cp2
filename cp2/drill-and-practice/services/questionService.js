import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, topic_id, q_text) => {
    await executeQuery(
      `INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES ($1, $2, $3)`,
      userId,
      topic_id,
      q_text,
    );
  };
  
  
const listQuestions = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE topic_id = $1
    `,
    topic_id);

    return res.rows;
};

export { addQuestion, listQuestions };