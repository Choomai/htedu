import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [exam_categories] = await pool.execute("SELECT * FROM exam_categories");

    return {
        exam_categories
    };
}