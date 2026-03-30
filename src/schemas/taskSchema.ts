import zod from 'zod';

export const CreateTodoSchema = zod.object({
    title: zod.string({
        error: (iss) => iss.input === undefined ? "Todo title is required." : "Todo title must be a string."
    }).trim().min(1, "Todo title is required."),
    description: zod.optional(zod.string("Todo must be a string.")
        .trim()
        .min(5, "Todo title must exceed 5 characters.")
        .max(100, "Todo title must not exceed 100 characters.")
    ),
    priority: zod.enum(["High", "Low", "Medium"]).prefault("Medium"),
    deadline: zod.optional(zod.coerce.date().min(new Date()))
})

export const UpdateTodoSchema = zod.object({
    title: zod.optional(zod.string({
        error: (iss) => iss.input === undefined ? "Todo title is required." : "Todo title must be a string."
    }).trim().min(1, "Todo title is required.")),
    description: zod.optional(zod.string("Todo description must be a string")
    .trim()
    .min(5, "Todo description must be more than 5 characters.")
    .max(100, "Todo description must not exceed 100 characters.")
    ),
    priority: zod.optional(zod.enum(["High", "Medium", "Low"])),
    deadline: zod.optional(zod.coerce.date().min(new Date()))
})