import { pool } from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    const [docs] = await pool.execute("SELECT docs.*, users.avatar FROM docs LEFT JOIN users ON docs.username = users.username WHERE docs.username = ?", [session.data.username]);
    return { docs };
}