import { error, redirect } from "@sveltejs/kit";
import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    const { session } = locals;
    if (!session.data.auth) return redirect(302, "/auth/login");
    if (session.data.verified) return redirect(302, "/");
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;

        const otp = data.get("otp");
        await pool.execute("DELETE FROM otp WHERE timestamp < NOW() - INTERVAL 10 MINUTE");
        const [otpQuery] = await pool.execute("SELECT username, otp FROM otp WHERE username = ?", [session.data.username]);
        if (otpQuery.length < 1 || otpQuery[0]?.otp != otp) return { success: false, message: "Sai mã OTP" }

        const [verifiedQuery] = await pool.execute("UPDATE users SET verified = true WHERE username = ?", [session.data.username]);
        if (verifiedQuery.affectedRows < 1) return { success: false, message: "Có lỗi xảy ra khi xác minh OTP" };
        await session.setData({ ...session.data, verified: true })
        await session.save();
        redirect(302, "/");
    }
};