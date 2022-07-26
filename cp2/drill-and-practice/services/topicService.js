import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
      (user_id, name)
        VALUES ($1, $2)`,
    userId,
    name,
  );
};

const deleteTopic = async (id) => {
  await executeQuery(
    `DELETE FROM topics WHERE id=$1`,
    id,
  );
};


const listTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics
      ORDER BY name ASC
    `);

  return res.rows;
};
  

export { addTopic, listTopics, deleteTopic };