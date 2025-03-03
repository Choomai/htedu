import { pool } from "$lib/db"
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const query_stmt = `
SELECT articles.*, users.username, users.avatar, COUNT(likes.id) AS total_likes, COUNT(comments.id) AS total_comments FROM articles
INNER JOIN users ON users.id = articles.user_id
LEFT JOIN likes ON likes.user_id = articles.user_id AND likes.article_id = articles.id
LEFT JOIN comments ON comments.user_id = articles.user_id AND comments.article_id = articles.id
GROUP BY articles.id
ORDER BY articles.timestamp DESC
    `;
    const [articles] = await pool.execute(query_stmt.replace(/\s+/g, " ").trim());
    return { articles: articles }
}

/** @type {import('./$types').Actions} */
export const actions = {
    new_article: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        if (!session.data.auth) throw redirect(302, "/auth/login");

        const content = data.get("content");
        // Check for empty HTML content
        if (!content) throw error(400, "Content is required");
        if (content.replace(/<[^>]*>/g, "").trim() === "") {
            throw error(400, "Content cannot be empty");
        }

        try {
            await pool.execute(
                "INSERT INTO articles(user_id, content) VALUES (?, ?)",
                [session.data.id, content]
            );
        } catch (err) {
            console.error(err);
            throw error(500, "Failed to create post");
        }
        throw redirect(303, "/community"); // Redirect after successful post
    }
};