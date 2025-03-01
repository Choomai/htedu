import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load() {
    error(404, "Not Found");
}