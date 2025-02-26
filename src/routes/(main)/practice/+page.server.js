import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [categories] = await pool.execute("SELECT * FROM categories");

    return { categories };
}