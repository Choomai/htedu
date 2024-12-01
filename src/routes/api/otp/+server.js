import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    throw error(503, "Not implemented");
    return new Response();
}