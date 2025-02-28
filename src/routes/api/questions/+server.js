import { error, json } from "@sveltejs/kit";
import { pool } from "$lib/db";
import { uuidPattern } from "$lib/const";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    // This will remain unused for a while
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
    // const { uuid, question, question_data } = data;

    // if (!uuid ||!question || !question_data) error(400, "Missing data");
    // if (!uuidPattern.test(uuid)) error(400, "Invalid UUID format");
    
    // const [result] = await pool.execute(
    //     "UPDATE questions SET question = ?, data = ? WHERE uuid = ? AND user_id = ?",
    //     [question, question_data, uuid, session.data.id]
    // );
    
    // if (result.affectedRows == 0) error(404, "Question not found");

    let successCount = 0;
    let errors = [];

    // Ensure data.questions is an array
    if (!Array.isArray(data)) error(400, "Expected array of questions");

    // Process each question update
    for (const quesTion of data) {
        quesTion.uuid ??= quesTion.client_uuid;
        const { uuid, assignment_uuid, type, question } = quesTion;
        if (!uuid || !assignment_uuid || ![0,1,2].includes(type) || !question || !quesTion.data) {
            errors.push({ uuid, error: "Missing data" });
            continue;
        }
        
        if (!uuidPattern.test(uuid) || !uuidPattern.test(assignment_uuid)) {
            errors.push({ uuid, error: "Invalid UUID format" });
            continue;
        }

        try {
            const [result] = await pool.execute(
                "INSERT INTO questions (uuid, assignment_uuid, question, type, data, user_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question = VALUES(question), data = VALUES(data)",
                [uuid, assignment_uuid, question, type, quesTion.data, session.data.id]
            );
            
            if (result.affectedRows > 0) successCount++
            else errors.push({ uuid, error: "Question not found" });
        } catch (err) {errors.push({ uuid, error: err })}
    }

    return json({
        success: true,
        updated: successCount,
        errors: errors
    });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) error(401, "Unauthorized");

    const data = await request.json();
    const { uuid } = data;

    if (!uuid) error(400, "Missing UUID");
    if (!uuidPattern.test(uuid)) error(400, "Invalid UUID format");

    const [result] = await pool.execute(
        "DELETE FROM questions WHERE uuid = ? AND user_id = ?",
        [uuid, session.data.id]
    );

    if (result.affectedRows == 0) error(404, "Question not found");
    return json({ success: true });
}