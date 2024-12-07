/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    
    if (!session.data.auth) redirect(302, "/auth/login");
    if (!session.data.verified) redirect(302, "/auth/verify");

    return { session: session.data };
}