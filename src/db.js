import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    database: "task_manager",
});

export default pool;