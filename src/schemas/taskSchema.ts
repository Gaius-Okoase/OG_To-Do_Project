import zod from 'zod';

export const CreateTodoSchema = zod.object({
    title: zod.string({
        error: (iss) => iss.input === undefined ? `Todo title is required.` : `Todo title should be a string.`
    }).trim().min(1, 'Todo title is required.'),
    description: zod.optional(
        zod.string().trim()
        .min(5, "Todo title must exceed 5 characters.")
        .max(100, "Todo title must not exceed 100 characters.")
    ),
    priority: zod.enum(["High", "Low", "Medium"]).prefault("Medium"),
    deadline: zod.optional(zod.date())
})