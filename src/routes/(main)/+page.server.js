import { pool } from "$lib";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const [teachers] = await pool.execute("SELECT * FROM users WHERE permission_level = 1 ORDER BY RAND() LIMIT 4")
    return { teachers }
}