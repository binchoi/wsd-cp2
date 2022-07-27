import { executeQuery } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
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
  
  
const listOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * from question_answer_options
    WHERE question_id = $question_id`,
    {question_id: question_id});

    return res.rows;
};

const deleteOption = async (o_id) => {
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id=$o_id`,
    {o_id: o_id},
  );
};


export { addOption, listOptions, deleteOption };