import { pool } from "$lib/db";
import { redirect } from "@sveltejs/kit";
import sharp from "sharp";
import path from "node:path";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [cats] = await pool.execute("SELECT * FROM categories ORDER BY title ASC");
    return { cats }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        const username = session.data.username;

        const thumbnailImg = data.get("thumbnail"),
            assTitle = data.get("title"),
            assCat = data.get("category");
        let thumbnailPath = null;
        const UUID = crypto.randomUUID();

        if (thumbnailImg instanceof File && thumbnailImg.type.startsWith("image/")) {
            const imgBuff = await thumbnailImg.arrayBuffer();
            thumbnailPath = path.join(process.cwd(), "static", "assignments", `${username}@${UUID}.webp`);
            
            await sharp(Buffer.from(imgBuff)).toFormat("webp").toFile(thumbnailPath);
            thumbnailPath = `/assignments/${username}@${UUID}.webp`;

            const [rows] = await pool.execute("INSERT INTO assignments(uuid, user_id, title, category, img_path) VALUES(?, ?, ?, ?, ?)", 
                [UUID, session.data.id, assTitle, assCat, thumbnailPath]);
            if (rows.affectedRows == 0) return { success: false, message: "Có lỗi xảy ra khi đăng bài tập" }
            
            redirect(302, `/assignments/${UUID}/edit`);
        } else return { success: false, message: "Hình ảnh không hợp lệ" };
    }
};