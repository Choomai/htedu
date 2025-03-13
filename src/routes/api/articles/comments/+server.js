import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
    const { session } = locals;
    if (!session.data.id) return json({ error: "Unauthorized" }, { status: 401 });

    const articleId = parseInt(url.searchParams.get("article_id"));
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const offset = (page - 1) * limit;

    if (!articleId) return json({ error: "Article ID is required" }, { status: 400 });

    try {
        // Get comments with user info
        // Issue: Can't map int to LIMIT and OFFSET, it seems like this is MySQL fault.
        // Temp fix: Convert to string
        // More info: https://github.com/sidorares/node-mysql2/issues/1239
        const [comments] = await pool.execute(
            `SELECT comments.*, users.username, users.avatar FROM comments
            LEFT JOIN users ON comments.user_id = users.id
            WHERE comments.article_id = ?
            ORDER BY comments.timestamp DESC LIMIT ? OFFSET ?`,
            [articleId, limit.toString(), offset.toString()]
        );
        const [totalQuery] = await pool.execute(
            "SELECT COUNT(id) AS total_count FROM comments WHERE article_id = ?",
            [articleId]
        );
        const totalCount = totalQuery[0].total_count;
        const hasMore = offset + limit < totalCount;

        return json({
            comments: comments.map(c => ({
                id: c.id,
                content: c.content,
                timestamp: c.timestamp,
                username: c.username,
                avatar: c.avatar,
                user_id: c.user_id
            })),
            hasMore,
            total: totalCount
        });

    } catch (error) {
        console.error("Error loading comments:", error);
        return json({ error: "Failed to load comments" }, { status: 500 });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { session } = locals;
    if (!session.data.id) return json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { article_id, content } = await request.json();

        if (!article_id || !content) return json({ error: "Missing required fields" }, { status: 400 });

        // Insert new comment
        const [result] = await pool.execute(
            "INSERT INTO comments(article_id, user_id, content) VALUES (?, ?, ?)",
            [article_id, session.data.id, content]
        );

        const [comments] = await pool.execute("SELECT * FROM comments WHERE id = LAST_INSERT_ID()");
        if (result.affectedRows == 0) throw new Error("Insert failed");

        const comment = {
            ...comments[0],
            username: session.data.username,
            avatar: session.data.avatar,
            user_id: session.data.id
        };

        return json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return json({ error: "Failed to create comment" }, { status: 500 });
    }
}