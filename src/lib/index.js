// place files you want to import through the `$lib` alias in this folder.
import { createPool } from "mysql2/promise";
import { DB_NAME, DB_HOST, DB_SOCKET, DB_USER, DB_PASSWORD } from "$env/static/private";

export const pool = createPool({
    host: DB_HOST,
    socketPath: DB_SOCKET,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME   
});

export const usernamePattern = /[a-z0-9._]{3,24}/i;
export const app_name = "Huong Tra";