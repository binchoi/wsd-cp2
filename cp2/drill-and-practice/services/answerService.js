import { executeQuery } from "../database/database.js";

const addAnswerRecord = async (uId, qId, oId) => {
    await executeQuery(
      `INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id)
          VALUES ($user_id, $question_id, $question_answer_option_id)`,
          {
            user_id: uId, 
            question_id: qId, 
            question_answer_option_id: oId
        }
    );
  };
  
export { addAnswerRecord };
