import { pool } from "$lib/db";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
    let stmt = null;
    if (url.pathname.startsWith("/study-area")) stmt = "SELECT docs.*, users.avatar FROM docs LEFT JOIN users ON docs.username = users.username"
    else if (url.pathname.startsWith("/practice")) stmt = "SELECT assignments.*, users.username, users.avatar FROM assignments LEFT JOIN users ON assignments.user_id = users.id"

    const [items] = await pool.execute(stmt);
    const [categories] = await pool.execute("SELECT * FROM categories");
    return { categories, items }
}