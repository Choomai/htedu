import { pool } from "$lib/db";
import { json } from "@sveltejs/kit";
import { join } from "node:path";
import fs from "node:fs/promises";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;

    const uuid = data.get("uuid");
    const [docsPath] = await pool.execute("SELECT path, img_path FROM docs WHERE uuid = ? AND username = ?", [uuid, session.data.username]);
    if (docsPath.length == 0) return json({ success: false, message: "Not found" }, { status: 404 });

    await fs.unlink(join(process.cwd(), "static", docsPath[0].path));
    await fs.unlink(join(process.cwd(), "static", docsPath[0].img_path));
    const [deleteQuery] = await pool.execute("DELETE FROM docs WHERE uuid = ? AND username = ?", [uuid, session.data.username]);
    if (deleteQuery.affectedRows == 0) return json({ success: false, message: "Unauthorized" }, { status: 403 })
    return json({ success: true, message: "Deleted" });
}