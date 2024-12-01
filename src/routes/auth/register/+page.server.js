import { scryptSync, randomBytes } from "node:crypto";
import path from "node:path";
import Safe from "safejslib";
import { redirect } from "@sveltejs/kit";
import { usernamePattern } from "$lib/const";
import { pool } from "$lib/db";
import sharp from "sharp";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        let email = data.get("email"), 
            username = data.get("username"),
            password = data.get("password"),
            passwordConfirm = data.get("password-confirm"),
            name = data.get("name"),
            avatar_image = data.get("avatar"),
            avatar_path = null;
        
        
        if (!(username && password && passwordConfirm && email)) return { success: false, message: "Hãy nhập đầy đủ các thông tin" };
        if (!usernamePattern.test(username)) return { success: false, message: "Username không hợp lệ" };
        // allow no email, but if exists then it must be correct.
        if (!Safe.validateEmail(email)) return { success: false, message: "Email không hợp lệ" };
        if (password != passwordConfirm) return { success: false, message: "Mật khẩu không giống nhau"};


        if (avatar_image instanceof File && avatar_image.type.startsWith("image/")) {
            const buff = await avatar_image.arrayBuffer()
            avatar_path = path.join(process.cwd(), "static", "avatars", `${username}.png`);
            await sharp(Buffer.from(buff)).toFormat("png").toFile(avatar_path);
            avatar_path = `/static/avatars/${username}.png`;
        }
        
        const salt = randomBytes(16).toString("hex");
        password = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
        const [rows] = await pool.execute(`
            INSERT INTO users(username, password, name, email, avatar)
            SELECT ?, ?, ?, ?, ?
            FROM dual
            WHERE NOT EXISTS (
                SELECT * FROM users
                WHERE username = ? OR email = ?
            )
            `.replace(/\s+/g, " ").trim(), [username, password, name, email, avatar_path, username, email]);
        if (rows.affectedRows == 0) return { success: false, message: "Username hoặc email trùng với tài khoản khác" };
        
        await session.setData({ auth: true, email, username, password});

        await session.setData({ 
            auth: true,
            verified: !!rows[0].verified,
            email,
            avatar: avatar_path,
            name,
            username,
            password
        });
        await session.save();
        return redirect(302, "/");
    }
};