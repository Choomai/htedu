import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
    throw error(403, "Forbidden");
}