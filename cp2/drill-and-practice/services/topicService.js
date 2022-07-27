import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
      (user_id, name)
        VALUES ($userId, $name)`,
    {
      userId: userId,
      name: name,
    }
  );
};

const deleteTopic = async (id) => {
  await executeQuery(
    `DELETE FROM topics WHERE id=$id`,
    {id: id},
  );
};


const listTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics
      ORDER BY name ASC
    `);

  return res.rows;
};
  

export { addTopic, listTopics, deleteTopic };