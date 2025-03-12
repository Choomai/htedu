import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
    const data = await request.json();
    const { session } = locals;
    
    if (!session.data.auth) return json({ liked: false, message: "Unauthorized" }, { status: 403 });
    if (typeof data.id !== "number") return json({ liked: false, message: "Invalid post ID" }, { status: 400 });
    
    // First check if like exists
    const [checkQuery] = await pool.execute(
        "SELECT id FROM likes WHERE article_id = ? AND user_id = ?",
        [data.id, session.data.id]
    );

    if (checkQuery.length > 0) {
        // Like exists, so delete it
        await pool.execute(
            "DELETE FROM likes WHERE article_id = ? AND user_id = ?",
            [data.id, session.data.id]
        );
        return json({ liked: false, message: `Un-liked the post ${data.id}` });
    }

    // No like exists, so insert it
    await pool.execute(
        "INSERT INTO likes(article_id, user_id) VALUES (?, ?)",
        [data.id, session.data.id]
    );
    return json({ liked: true, message: `Liked the post ${data.id}` });
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