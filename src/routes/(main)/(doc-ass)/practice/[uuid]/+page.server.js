import { error } from "@sveltejs/kit";
import { pool } from "$lib/db";
import { uuidPattern } from "$lib/const";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    if (!uuidPattern.test(params.uuid)) error(400, "Invalid UUID format");
    
    // Get questions from both direct assignments and generated assignments
    const [questions] = await pool.execute(`
        SELECT questions.* 
        FROM questions
        LEFT JOIN gen_assignments ON gen_assignments.question_uuid = questions.uuid
        WHERE gen_assignments.assignment_uuid = ? OR questions.assignment_uuid = ?
    `, [params.uuid, params.uuid]);

    if (questions.length === 0) throw error(404, "Not Found");
    
    return { questions }
}