/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = locals;

    return { auth: session.data.auth };
}