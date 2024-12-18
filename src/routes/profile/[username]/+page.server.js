import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    const { session } = locals;
    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [params.username])
    return { user: rows[0], session: session.data }
}