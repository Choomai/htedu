import { pool } from "$lib/db";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    if (process.env.OTP_DISABLED) throw error(503, "Service Unavailable");
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const password = data.get("password"), passwordConfirm = data.get("password-confirm");
        const otp = data.get("otp"), email = data.get("email");
        if (password != passwordConfirm) return { success: false, message: "Mật khẩu không giống nhau" };

        const [usernameRows] = await pool.execute("SELECT username FROM users WHERE email = ?", [email]);
        if (usernameRows.length < 1) return { success: false, message: "Email chưa được đăng ký" };

        const [otpRows] = await pool.execute("SELECT * FROM otp WHERE username = ?", [usernameRows[0].username]);
        if (otpRows.length < 1 || otpRows[0]?.otp != otp) return { success: false, message: "Sai mã OTP" };

        const salt = randomBytes(16).toString("hex");
        const hashedPassword = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
        const [updateQuery] = await pool.execute("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        if (updateQuery.affectedRows != 1) return { success: false, message: "Có lỗi xảy ra khi cập nhật mật khẩu" };

        const { session } = locals;
        await session.setData({ ...session.data, password: hashedPassword });
        await session.save();
        redirect(302, "/auth/login");
    }
};