import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [rows] = await pool.execute("SELECT * FROM users WHERE permission_level >= 1");
    // console.log(rows)
    return { teachers: rows }
}