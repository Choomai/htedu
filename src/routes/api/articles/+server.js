import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
    const data = await request.json();
    const { session } = locals;
    
    if (!session.data.auth) return json({ success: false, message: "Unauthorized" }, { status: 403 });
    if (typeof data.id !== "number") return json({ success: false, message: "Invalid post ID" }, { status: 400 });
    
    const [likeQuery] = await pool.execute(
        "INSERT INTO likes(article_id, user_id) SELECT ?, ? WHERE NOT EXISTS(SELECT 1 FROM likes WHERE article_id = ? AND user_id = ?)",
        [data.id, session.data.id, data.id, session.data.id]
    );
    if (likeQuery.affectedRows == 0) return json({ success: false, message: "Already liked this post" }, { status: 409 });
    return json({ success: true, message: null })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;

    if (!session.data.auth) return json({ success: false, message: "Unauthorized" }, { status: 403 });

    const articleId = data.get("id");
    const [deleteQuery] = await pool.execute("DELETE FROM articles WHERE id = ? AND user_id = ?", [articleId, session.data.id]);
    if (deleteQuery.affectedRows == 0) return json({ success: false, message: "Unauthorized" }, { status: 403 });
    return json({ success: true, message: "Deleted" });
}