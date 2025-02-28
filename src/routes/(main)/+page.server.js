import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    const [teachers] = await pool.execute("SELECT * FROM users WHERE permission_level = 1 ORDER BY RAND() LIMIT 4");
    let stats = [null];
    if (session.data.permission_level >= 1) [stats] = await pool.execute(`
        SELECT
            COUNT(follows.follow_user_id) AS followers_count,
            (SELECT COUNT(articles.id) FROM articles WHERE user_id = ?) AS articles_count,
            (SELECT COUNT(assignment.id) FROM assignments WHERE user_id = ?) AS assignments_count
        FROM follows
        WHERE follow_user_id = ?`.replace(/\s+/g, " ").trim(), [session.data.id, session.data.id, session.data.id]);
    const [docs] = await pool.execute("SELECT docs.*, users.avatar FROM docs LEFT JOIN users ON docs.username = users.username ORDER BY RAND() LIMIT 4");
    
    return { teachers, stats: stats[0], session: session.data, docs }
}