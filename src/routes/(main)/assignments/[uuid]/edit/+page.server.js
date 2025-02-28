import { pool } from "$lib/db";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(params.uuid)) error(400, "Invalid UUID format");

    const { session } = locals;
    const [questions] = await pool.execute("SELECT * FROM questions WHERE assignment_uuid = ? AND user_id = ?", [params.uuid, session.data.id]);

    return { questions };
}