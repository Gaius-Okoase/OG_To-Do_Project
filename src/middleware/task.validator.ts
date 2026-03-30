import type { Request, Response, NextFunction } from "express";
import zod from "zod";
import { CreateTodoSchema } from "../schemas/taskSchema.js";

export const createTodoValidator = (req: Request, res: Response, next: NextFunction) => {
    type UserData = zod.infer<typeof CreateTodoSchema>;

    const userData: UserData = req.body;

    const result = CreateTodoSchema.safeParse(userData);

    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }

    return next()
}

