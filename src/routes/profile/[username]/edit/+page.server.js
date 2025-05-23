import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const { session } = locals;
    if (session.data.username != params.username) error(403, "Forbidden");
    return {
        username: session.data.username,
        name: session.data.name,
        email: session.data.email
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        throw error(501, "Not Implemented");
    }
};