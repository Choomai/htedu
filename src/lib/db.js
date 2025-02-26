import { createPool } from "mysql2/promise";
import { DB_NAME, DB_HOST, DB_SOCKET, DB_USER, DB_PASSWORD } from "$env/static/private";

export const pool = createPool({
    host: DB_HOST,
    socketPath: DB_SOCKET,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});