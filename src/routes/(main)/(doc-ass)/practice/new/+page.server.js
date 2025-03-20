import { pool } from "$lib/db";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        
        const name = data.get("name"),
            multipleChoiceCount = data.get("multiple-choice"),
            trueFalseCount = data.get("true-false"),
            trueFalseAddType = parseInt(data.get("true-false-add-type")),
            trueFalseAddCount = data.get("true-false-add");

        const [mcCount] = await pool.execute("SELECT COUNT(uuid) as count FROM questions WHERE type = 0");
        const [tfCount] = await pool.execute("SELECT COUNT(uuid) as count FROM questions WHERE type = 1 AND true_false_type = 0");
        const [tfAddCount] = await pool.execute("SELECT COUNT(uuid) as count FROM questions WHERE type = 1 AND true_false_type = ?", [trueFalseAddType]);

        if (mcCount[0].count < multipleChoiceCount) {
            return { success: false, message: "Không đủ câu hỏi trắc nghiệm" };
        }
        if (tfCount[0].count < trueFalseCount) {
            return { success: false, message: "Không đủ câu hỏi đúng/sai cơ bản" };
        }
        if (tfAddCount[0].count < trueFalseAddCount) {
            return { success: false, message: "Không đủ câu hỏi đúng/sai nâng cao" };
        }

        const uuid = crypto.randomUUID();
        await pool.execute(
            "INSERT INTO assignments(uuid, user_id, title, category) VALUES(?, ?, ?, 'gen')",
            [uuid, session.data.id, name]
        );

        await pool.execute(
            `INSERT INTO gen_assignments(assignment_uuid, question_uuid)
            SELECT ? AS assignment_uuid, uuid AS question_uuid FROM questions
            WHERE type = 0
            ORDER BY RAND()
            LIMIT ?`,
            [uuid, multipleChoiceCount.toString()]
        )
        await pool.execute(
            `INSERT INTO gen_assignments(assignment_uuid, question_uuid)
            SELECT ? AS assignment_uuid, uuid AS question_uuid FROM questions
            WHERE type = 1 AND true_false_type = 0
            ORDER BY RAND()
            LIMIT ?`,
            [uuid, trueFalseCount.toString()]
        )
        await pool.execute(
            `INSERT INTO gen_assignments(assignment_uuid, question_uuid)
            SELECT ? AS assignment_uuid, uuid AS question_uuid FROM questions
            WHERE type = 1 AND true_false_type = ?
            ORDER BY RAND()
            LIMIT ?`,
            [uuid, trueFalseAddType, trueFalseAddCount.toString()]
        )
        return redirect(302, `/practice/${uuid}`);
    }
};