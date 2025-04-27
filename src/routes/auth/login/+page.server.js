import { scryptSync, timingSafeEqual } from "node:crypto";
import { pool } from "$lib/db";
import { redirect } from "@sveltejs/kit";
import { TURNSTILE_SECRET_KEY } from "$env/static/private";
import { validateToken } from "sveltekit-turnstile";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        let username = data.get("username"), password = data.get("password");
        if (!(username && password)) return { success: false, message: "Hãy nhập đầy đủ các thông tin" };

        const token = data.get("token");
        const capchaSuccess = await validateToken(token, TURNSTILE_SECRET_KEY);
        if (!capchaSuccess) return { success: false, message: "CAPCHA không hợp lệ" };
        
        let [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length == 0) return { success: false, message: "Tài khoản không tồn tại" };
        
        const [salt, key] = rows[0].password.split(":");
        password = scryptSync(password, salt, 64);
        if (!timingSafeEqual(password, Buffer.from(key, "hex"))) return { success: false, message: "Sai mật khẩu" }
        await session.setData({
            ...rows[0],
            auth: true,
            verified: !!rows[0].verified,
        });
        await session.save();
        return redirect(302, "/");
    }
};