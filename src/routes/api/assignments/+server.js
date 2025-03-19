import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";
import { join } from "node:path";
import fs from "node:fs/promises";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;

    const uuid = data.get("uuid");
    const [thumbnailPath] = await pool.execute("SELECT img_path FROM assignments WHERE uuid = ? AND user_id = ?", [uuid, session.data.id]);
    if (thumbnailPath[0].img_path) await fs.unlink(join(process.cwd(), "static", thumbnailPath[0].img_path));

    const [deleteQuery] = await pool.execute("DELETE FROM assignments WHERE uuid = ? AND user_id = ?", [uuid, session.data.id]);
    if (deleteQuery.affectedRows == 0) return json({ success: false, message: "Unauthorized" }, { status: 403 })
    return json({ success: true, message: "Deleted" });
}