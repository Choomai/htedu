import { error } from "@sveltejs/kit";
import { pool } from "$lib/db";

/** @type {import("./$types").RequestHandler} */
export async function PUT({ request, locals }) {
    const { session } = locals;

    const userId = session.data.id;
    const followUserId = await request.text();

    if (!userId) error(401, "You must be logged in to follow someone");
    if (!followUserId) error(400, "You must provide a user ID to follow");
    if (userId == followUserId) error(400, "You cannot follow yourself");

    const [rows] = await pool.execute("INSERT INTO follows (user_id, follow_user_id) VALUES (?, ?) ON DUPLICATE KEY DELETE", [userId, followUserId]);
    return new Response(rows.affectedRows > 0 ? "Followed" : "Unfollowed", { 
        status: rows.affectedRows > 0 ? 201 : 200
    });
}