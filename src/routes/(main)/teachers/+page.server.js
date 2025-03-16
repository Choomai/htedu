import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [rows] = await pool.execute("SELECT username, name, avatar FROM users WHERE permission_level >= 1");
    return { teachers: rows }
}