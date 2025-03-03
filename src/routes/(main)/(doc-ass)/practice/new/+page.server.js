/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const { session } = locals;
        
        const name = data.get("name"),
            multipleChoiceCount = data.get("multiple-choice"),
            trueFalseCount = data.get("true-false"),
            trueFalseAddType = data.get("true-false-add-type"),
            trueFalseAddCount = data.get("true-false-add");
        return { success: false, message: "Thiếu dữ liệu câu hỏi để tạo đề" }
    }
};