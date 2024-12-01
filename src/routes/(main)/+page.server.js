import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    if (session.data.auth && !session.data.verified) return redirect(302, "/auth/verify");
}