/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    return { session: session.data };
}