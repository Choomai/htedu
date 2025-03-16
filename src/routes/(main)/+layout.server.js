import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    const { session } = locals;
    
    if (!session.data.auth) redirect(302, "/auth/login");
    if (!session.data.verified) redirect(302, "/auth/verify");

    return { 
        session: {
            id: session.data.id,
            username: session.data.username,
            name: session.data.name,
            avatar: session.data.avatar
        }
    }
}