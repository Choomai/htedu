import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    const { session } = locals;
    await session.destroy();

    return redirect(302, "/");
}