import pool from "./db.js";

async function getAllTasks() {
  const result = await pool.query(`
    SELECT *
    FROM tasks
    ORDER BY id ASC;
  `);

  return result.rows;
}

async function getTaskById(id) {
  const result = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = $1
    ORDER BY id ASC;
  `,
    [id]);

  return result.rows[0];
}

async function createTask(title) {
  const result = await pool.query(`
    INSERT INTO tasks (title)
    VALUES ($1)
    RETURNING *;
  `,
    [title]);

  return result.rows[0];
}

async function completeTask(id) {
  const result = await pool.query(`
    UPDATE tasks
    SET completed = TRUE
    WHERE id = $1
    RETURNING *;
  `,
    [id]);

  return result.rows[0];
}

async function deleteTask(id) {
  const result = await pool.query(`
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *;
  `,
    [id]);

  return result.rows[0];
}

async function updateTaskTitle(id, newTitle) {
  const result = await pool.query(`
    UPDATE tasks    
    SET title = $2
    WHERE id = $1
    RETURNING *;
  `,
    [id, newTitle]);

  return result.rows[0];
}

export { getAllTasks, getTaskById, createTask, completeTask, deleteTask, updateTaskTitle };
