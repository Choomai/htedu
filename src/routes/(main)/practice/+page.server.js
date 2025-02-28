import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [categories] = await pool.execute("SELECT * FROM categories");
    const [assignments] = await pool.execute("SELECT assignments.*, users.username, users.avatar FROM assignments LEFT JOIN users ON assignments.user_id = users.id")

    return { categories, assignments };
}