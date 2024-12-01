import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) return redirect(302, "/auth/login");
    if (session.data.verified) return redirect(302, "/");
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const { session } = locals;
    }
};