import { scryptSync } from "node:crypto";
import Safe from "safejslib";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        let email = data.get("email"), password = data.get("password");
        if (!(email && password)) return { success: false, message: "Hãy nhập đầy đủ các thông tin" };
        if (!Safe.validateEmail(email)) return { success: false, message: "Email không hợp lệ" };
        
        let [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length <= 0) return { success: false, message: "Tài khoản không tồn tại" };

        password = scryptSync(password, salt, 64).toString("hex");
        if (password != rows.password) return { success: false, message: "Sai mật khẩu" }
        await session.setData({ auth: true, email, username: rows.username, password });
        await session.save();
        return redirect(302, "/");
    }
};