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
            teacherToggle = data.get("teacher"),
            avatarImage = data.get("avatar"),
            avatarPath = null;
        
        
        if (!(username && password && passwordConfirm && email)) return { success: false, message: "Hãy nhập đầy đủ các thông tin" };
        if (!usernamePattern.test(username)) return { success: false, message: "Username không hợp lệ" };
        // allow no email, but if exists then it must be correct.
        if (!Safe.validateEmail(email)) return { success: false, message: "Email không hợp lệ" };
        const emailDomain = email.split("@")[1];
        if (teacherToggle && !emailDomain.includes(".edu.")) return { success: false, message: "Email không thuộc domain EDU" };
        if (password != passwordConfirm) return { success: false, message: "Mật khẩu không giống nhau"};

        if (avatarImage instanceof File && avatarImage.size > 0) {
            if (avatarImage.type.startsWith("image/")) {
                const buff = await avatarImage.arrayBuffer();
                avatarPath = path.join(process.cwd(), "static", "avatars", `${username}.webp`);
                await sharp(Buffer.from(buff)).toFormat("webp").toFile(avatarPath);
                avatarPath = `/avatars/${username}.webp`;
            } else return {
                success: false,
                message: "Hình ảnh không hợp lệ"
            }
        };
        
        const permissionLevel = teacherToggle ? 1 : 0;
        // get the default value of permission_level column
        // const [defaultValue] = await pool.execute(`SELECT column_default FROM information_schema.columns WHERE table_name = "users" AND column_name = "permission_level"`);
        // if (!permissionLevel) permissionLevel = defaultValue[0].column_default ?? 0;
        
        const salt = randomBytes(16).toString("hex");
        password = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
        const [rows] = await pool.execute(`
            INSERT INTO users(username, password, name, email, avatar, permission_level)
            SELECT ?, ?, ?, ?, ?, ?
            FROM dual
            WHERE NOT EXISTS (
                SELECT * FROM users
                WHERE username = ? OR email = ?
            )
            `.replace(/\s+/g, " ").trim(), [username, password, name, email, avatarPath, permissionLevel, username, email]);
        if (rows.affectedRows == 0) return { success: false, message: "Username hoặc email trùng với tài khoản khác" };

        const [userId] = await pool.execute("SELECT id FROM users WHERE username = ?", [username]);
        await session.setData({
            auth: true,
            id: userId[0].id,
            verified: process.env.OTP_DISABLED == "true",
            email,
            avatar: avatarPath,
            name,
            permission_level: permissionLevel,
            username,
            password
        });
        await session.save();
        return redirect(302, "/");
    }
};