import { executeQuery } from "../database/database.js";

const getQuestionById = async (q_id) => {
  const res = await executeQuery(`SELECT * FROM questions
    WHERE id = $id
    `,
    {id: q_id});

    return res.rows[0];
}

const addQuestion = async (userId, topic_id, q_text) => {
    await executeQuery(
      `INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES ($user_id, $topic_id, $q_text)`,
      {
        user_id: userId,
        topic_id: topic_id,
        q_text: q_text,
      }
    );
  };
  
  
const listQuestions = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE topic_id = $topic_id
    `,
    {topic_id: topic_id});

    return res.rows;
};

const getRandQuestion = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE topic_id = $topic_id ORDER BY RANDOM()
    `,
    {topic_id: topic_id});

    return res.rows;
};

const getRandomQuestions = async () => {
  const res = await executeQuery(`SELECT * FROM questions
  ORDER BY RANDOM()
  `);

  return res.rows;
};

const deleteQuestion = async (qId) => {
  await executeQuery(
    `DELETE FROM questions WHERE id=$qId`,
    {qId: qId},
  );
};

export { addQuestion, listQuestions, deleteQuestion, getRandQuestion, getQuestionById, getRandomQuestions };
