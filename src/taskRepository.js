import pool from "./db.js";

// Retrieve a list of tasks with optional filtering, sorting, and pagination.
//
// The default empty object allows listTasks() to be called without arguments.
// sortOrder defaults to "ASC" when it is not provided.
async function listTasks({
  completed,
  sortOrder = "ASC",
  limit,
  offset
} = {}) {
  // Allow only two fixed SQL sorting directions.
  // Any value other than "DESC" falls back to "ASC".
  const order = sortOrder === "DESC" ? "DESC" : "ASC";

  // Store query values separately from the SQL string.
  // PostgreSQL placeholders will reference values by position:
  // $1 -> values[0], $2 -> values[1], and so on.
  const values = [];

  // Start with the base query.
  let query = `
    SELECT *
    FROM tasks
  `;

  // Apply the completed filter only when it was provided.
  // This check accepts both true and false as valid values.
  if (completed !== undefined) {
    values.push(completed);

    // values.length creates the correct PostgreSQL placeholder.
    // For example, the first value uses $1.
    query += ` WHERE completed = $${values.length}`;
  }

  // Add a safe sorting direction selected above.
  query += ` ORDER BY id ${order}`;

  // Add pagination only when a limit was provided.
  // The Service layer should validate limit and offset first.
  if (limit !== undefined) {
    values.push(limit);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;
  }

  // Finish the SQL statement.
  query += ";";

  // Send the SQL and its parameter values separately to PostgreSQL.
  const result = await pool.query(query, values);

  // Return only the task rows, not the full query result metadata.
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

export {
  listTasks,
  getTaskById,
  createTask,
  completeTask,
  deleteTask,
  updateTaskTitle,
};
