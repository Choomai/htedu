import { pool } from "$lib/db";
import { error, text } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");
    
    const data = await request.json();
    

    const [rows] = await pool.execute("INSERT INTO report(article_id, user_id) VALUES(?, ?)", [data.article_id, session.data.id]);
    if (rows.affectedRows == 0) throw error(500);
    return new Response(null);
}