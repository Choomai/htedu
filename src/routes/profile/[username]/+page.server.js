import { pool } from "$lib/db";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    const { session } = locals;
    const [user] = await pool.execute("SELECT * FROM users WHERE username = ?", [params.username]);
    if (user.length == 0) error(404, "Not Found");
    
    const [followed] = await pool.execute("SELECT * FROM follows WHERE user_id = ? AND follow_user_id = ?", [session.data.id, user[0].id]);
    const [following_count] = await pool.execute("SELECT COUNT(follow_user_id) AS count FROM follows WHERE user_id = ?", [user[0].id]);
    return { user: user[0], followed: followed.length == 1, session: session.data, following: following_count[0] }
}