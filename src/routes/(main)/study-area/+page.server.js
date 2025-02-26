import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [exam_categories] = await pool.execute("SELECT * FROM categories");
    const [docs] = await pool.execute("SELECT docs.*, users.avatar FROM docs LEFT JOIN users ON docs.username = users.username");

    return { exam_categories, docs };
}