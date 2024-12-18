import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [params.username])
    return { user: rows }
}