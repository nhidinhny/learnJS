import pool from "./db.js";

async function getAllTasks() {
    const result = await pool.query(`
    SELECT *
    FROM tasks
    ORDER BY id ASC;
  `);

    return result.rows;
}

export { getAllTasks };
