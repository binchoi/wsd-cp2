import { executeQuery } from "../database/database.js";

const addQuestionOption = async (question_id, option_text, is_correct) => {
    await executeQuery(
      `INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES ($1, $2, $3)`,
          question_id, 
          option_text, 
          is_correct
    );
  };
  
  
const listQuestions = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE topic_id = $1
    `,
    topic_id);

    return res.rows;
};

export { addQuestionOption, listQuestions };