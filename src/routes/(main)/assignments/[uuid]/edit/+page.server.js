import { error } from "@sveltejs/kit";
import { pool } from "$lib/db";
import { uuidPattern } from "$lib/const";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    if (!uuidPattern.test(params.uuid)) error(400, "Invalid UUID format");

    const { session } = locals;
    const [questions] = await pool.execute("SELECT * FROM questions WHERE assignment_uuid = ? AND user_id = ?", [params.uuid, session.data.id]);

    return { questions };
}