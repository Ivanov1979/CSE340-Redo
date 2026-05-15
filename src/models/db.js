import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "ce340redo_user",
    host: "dpg-d82j5bgg4nts73b27o5g-a.oregon-postgres.render.com",
    database: "ce340redo",
    password: "yphBIumABUHCgqEBqg6dXRUuMCLpJ2C9",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;