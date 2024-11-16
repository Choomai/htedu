import { scryptSync, randomBytes } from "node:crypto";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const usernamePattern = /[a-z0-9._]{3,16}/i;
        const data = await request.formData();
        const { session } = locals;
        let email = data.get("email"), username = data.get("username"), password = data.get("password");
        if (!(username && password)) return { success: false, message: "Hãy nhập đầy đủ các thông tin" };
        if (!usernamePattern.test(username)) return { success: false, message: "Username không hợp lệ" };
        // allow no email, but if exists then it must be correct.
        if (email && !Safe.validateEmail(email)) return { success: false, message: "Email không hợp lệ" };
        
        const salt = randomBytes(16).toString("hex");
        password = scryptSync(password, salt, 64).toString("hex");
        let [rows] = await pool.execute(`
            INSERT INTO users(email, username, password)
            VALUES (?, ?, ?)
            `, [email, username, password]);
        if (rows.affectedRows == 0) return { success: false, message: "Username hoặc email trùng với tài khoản khác" };
        
        await session.setData({ auth: true, email, username, password});
        await session.save();
        return redirect(302, "/");
    }
};