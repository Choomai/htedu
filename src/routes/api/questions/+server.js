import { pool } from "$lib/db";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");

    const data = await request.json();
    const { question, type, question_data } = data;

    if (!question || !type || !question_data) error(400, "Content is required");
    if (+type < 0 && +type > 3) error(400, "Invalid type");

    const [result] = await pool.execute(
        "INSERT INTO questions(question, user_id, type, data) VALUES(?, ?, ?, ?)",
        [question, session.data.id, type, question_data]
    );
    if (result.length == 0) error(500, "Server error");
    return json(result[0], { status: 201 });
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
    
    return new Response();
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    
    return new Response();
}