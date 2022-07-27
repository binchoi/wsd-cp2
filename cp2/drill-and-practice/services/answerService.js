import { executeQuery } from "../database/database.js";

const addAnswerRecord = async (question_id, option_text, is_correct) => {
    await executeQuery(
      `INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES ($question_id, $option_text, $is_correct)`,
          {
            question_id: question_id, 
            option_text: option_text, 
            is_correct: is_correct
        }
    );
  };
  
  
const listAnswerRecords = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE topic_id = $topic_id
    `,
    {topic_id: topic_id});

    return res.rows;
};

export { addAnswerRecord, listAnswerRecords };
