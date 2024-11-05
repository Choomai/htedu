import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    const { session } =  locals;
    await session.destory();

    return redirect(301, "/");
}