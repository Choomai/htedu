import { error } from "@sveltejs/kit";
import { pool } from "$lib";

/** @type {import("./$types").RequestHandler} */
export async function PUT({ request, locals }) {
    const { session } = locals;

    const userId = session.data.id;
    const followUserId = await request.text();

    if (!userId) error(401, "You must be logged in to follow someone");
    if (!followUserId) error(400, "You must provide a user ID to follow");
    if (userId == followUserId) error(400, "You cannot follow yourself");

    const [followed] = await pool.execute("SELECT * FROM follows WHERE user_id = ? AND follow_user_id = ?", [userId, followUserId]);
    let rows;
    if (followed.length == 0) { // Not follow yet
        [rows] = await pool.execute("INSERT INTO follows (user_id, follow_user_id) VALUES (?, ?)", [userId, followUserId]);
        return new Response("Followed", { status: 201 });
    } else { // Already followed, unfollow
        [rows] = await pool.execute("DELETE FROM follows WHERE user_id = ? AND follow_user_id = ?", [userId, followUserId]);
        return new Response("Unfollowed", { status: 200 });
    }
}