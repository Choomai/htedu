import { pool } from "$lib"
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    error(403, "Forbidden");
    const query_stmt = `
SELECT articles.*, users.username, users.avatar, COUNT(likes.id) AS total_likes, COUNT(comments.id) AS total_comments FROM articles
INNER JOIN users ON users.id = articles.user_id
LEFT JOIN likes ON likes.user_id = articles.user_id AND likes.article_id = articles.id
LEFT JOIN comments ON comments.user_id = articles.user_id AND comments.article_id = articles.id
GROUP BY articles.id
    `;
    const [articles] = await pool.execute(query_stmt.replace(/\s+/g, " ").trim());
    return { articles: articles }
}

/** @type {import('./$types').Actions} */
export const actions = {
    new_article: async ({ locals }) => {
        const { session } = locals;
        if (!session.data.auth) redirect(302, "/auth/login");

        error(503, "Not implemented");
    }
};