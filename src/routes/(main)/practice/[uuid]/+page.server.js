import { error } from "@sveltejs/kit";
import { pool } from "$lib/db";
import { uuidPattern } from "$lib/const";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    if (!uuidPattern.test(params.uuid)) error(400, "Invalid UUID format");
    const [questions] = await pool.execute("SELECT * FROM questions WHERE assignment_uuid = ?", [params.uuid])
    if (questions.length == 0) error(404, "Not Found");
    return { questions }
}