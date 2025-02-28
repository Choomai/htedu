import { pool } from "$lib/db";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");

    const data = await request.json();
    const { question, type, question_data } = data;
    const UUID = crypto.randomUUID();

    if (!question || !type || !question_data) error(400, "Missing data");
    if (+type < 0 && +type > 3) error(400, "Invalid type");

    const [result] = await pool.execute(
        "INSERT INTO questions(uuid, question, user_id, type, data) VALUES(?, ?, ?, ?, ?)",
        [UUID, question, session.data.id, type, question_data]
    );
    if (result.length == 0) error(500, "Server error");
    return json({ success: true, uuid: UUID }, { status: 201 });
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");

    const data = await request.json();
    const { uuid, question, question_data } = data;

    if (!uuid ||!question || !question_data) error(400, "Missing data");
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) error(400, "Invalid UUID format");
    
    const [result] = await pool.execute(
        "UPDATE questions SET question = ?, data = ? WHERE uuid = ? AND user_id = ?",
        [question, question_data, uuid, session.data.id]
    );
    
    if (result.affectedRows == 0) error(404, "Question not found");
    return json({ success: true });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");

    const data = await request.json();
    const { uuid } = data;

    if (!uuid) error(400, "Missing UUID");
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) error(400, "Invalid UUID format");

    const [result] = await pool.execute(
        "DELETE FROM questions WHERE uuid = ? AND user_id = ?",
        [uuid, session.data.id]
    );

    if (result.affectedRows == 0) error(404, "Question not found");
    return json({ success: true });
}