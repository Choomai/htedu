import { pool } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [cats] = await pool.execute("SELECT * FROM categories");
    return { categories: cats }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { session } = locals;
        const username = session.data.username;

        const assFile = data.get("ass"),
            thumbnailImg = data.get("thumbnail"),
            assName = data.get("name"),
            assCat = data.get("category");
        let assFilePath = null, thumbnailPath = null;
        const UUID = crypto.randomUUID();

        if (thumbnailImg instanceof File && thumbnailImg.type.startsWith("image/")) {
            const imgBuff = await thumbnailImg.arrayBuffer();
            thumbnailPath = path.join(process.cwd(), "static", "docs", `${username}@${UUID}.webp`);
            
            await sharp(Buffer.from(imgBuff)).toFormat("webp").toFile(thumbnailPath);
            thumbnailPath = `/docs/${username}@${UUID}.webp`;
        } else return { success: false, message: "Hình ảnh không hợp lệ" };
    }
};