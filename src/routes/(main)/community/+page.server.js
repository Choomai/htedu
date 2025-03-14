import { pool } from "$lib/db"
import { error, redirect } from "@sveltejs/kit";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    const query_stmt = `
SELECT
    articles.*, users.username, users.avatar,
    COUNT(DISTINCT likes.id) AS total_likes, COUNT(DISTINCT comments.id) AS total_comments,
    MAX(CASE WHEN likes.user_id = ? THEN 1 ELSE 0 END) AS already_liked
FROM articles
INNER JOIN users ON users.id = articles.user_id
LEFT JOIN likes ON likes.article_id = articles.id
LEFT JOIN comments ON comments.article_id = articles.id
GROUP BY articles.id
ORDER BY articles.timestamp DESC`;
    const [articles] = await pool.execute(query_stmt.replace(/\s+/g, " ").trim(), [session.data.id]);
    return { articles }
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

        // Sanitize HTML content
        const sanitizedContent = DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ["h1", "h2", "p", "b", "i", "em", "strong", "a", "ul", "ol", "li", "br", "code", "img"],
            ALLOWED_ATTR: ["href", "src", "target"]
        });

        try {
            await pool.execute(
                "INSERT INTO articles(user_id, content) VALUES (?, ?)",
                [session.data.id, sanitizedContent]
            );
        } catch (err) {
            console.error(err);
            throw error(500, "Failed to create post");
        }
        throw redirect(303, "/community"); // Redirect after successful post
    }
};