import { pool } from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    const [assignments] = await pool.execute(
        "SELECT assignments.*, users.username, users.avatar FROM assignments LEFT JOIN users ON assignments.user_id = users.id WHERE user_id = ?",
        [session.data.id]
    );
    return { assignments };
}