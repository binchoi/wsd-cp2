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

const getOptionById = async (id) => {
  const res = await executeQuery(`SELECT * FROM question_answer_options
    WHERE id = $id
    `,
    {id: id});

    return res.rows[0];
}
  
const listOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * from question_answer_options
    WHERE question_id = $question_id`,
    {question_id: question_id});

    return res.rows;
};

const getCorrectOption = async (question_id) => {
  const res = await executeQuery(`SELECT * from question_answer_options
  WHERE question_id = $question_id AND is_correct = true`,
  {question_id: question_id});

  if ( res.length <1) {
    return undefined;
  }

  return res.rows[0];
};

const deleteOption = async (o_id) => {
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id=$o_id`,
    {o_id: o_id},
  );
};


export { addOption, listOptions, deleteOption, getOptionById, getCorrectOption };