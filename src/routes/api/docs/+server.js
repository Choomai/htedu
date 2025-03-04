import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;

    const uuid = data.get("uuid");
    const [deleteQuery] = await pool.execute("DELETE FROM docs WHERE uuid = ? AND username = ?", [uuid, session.data.username]);
    if (deleteQuery.affectedRows == 0) return json({ success: false, message: "Unauthorized" }, { status: 403 })
    return json({ success: true, message: "Deleted" });
}