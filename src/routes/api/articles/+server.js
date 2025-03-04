import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;

    const articleId = data.get("id");
    const [deleteQuery] = await pool.execute("DELETE FROM articles WHERE id = ? AND user_id = ?", [articleId, session.data.id]);
    if (deleteQuery.affectedRows == 0) return json({ success: false, message: "Unauthorized" }, { status: 403 })
    return json({ success: true, message: "Deleted" });
}