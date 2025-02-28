import { error } from "@sveltejs/kit";
import { pool } from "$lib/db";
import { uuidPattern } from "$lib/const";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (!uuidPattern.test(params.uuid)) error(400, "Invalid UUID format");

    const [docs] = await pool.execute("SELECT * FROM docs WHERE uuid = ?", [params.uuid]);
    if (docs.length == 0) error(404, "Not found");
    return { docs };
}