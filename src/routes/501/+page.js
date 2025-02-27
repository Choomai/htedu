import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    error(501, "Not Implemented");
}