import { pool } from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    const [docs] = await pool.execute("SELECT * FROM docs WHERE username = ?", [session.data.username]);
    return { docs };
}