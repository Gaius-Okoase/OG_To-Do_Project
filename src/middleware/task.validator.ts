import type { Request, Response, NextFunction } from "express";
import zod from "zod";
import { CreateTodoSchema, UpdateTodoSchema } from "../schemas/taskSchema.js";

export const createTodoValidator = (req: Request, _res: Response, next: NextFunction) => {
    type UserData = zod.infer<typeof CreateTodoSchema>;

    const userData: UserData = req.body;

    const result = CreateTodoSchema.safeParse(userData);

    if (!result.success) return next(result.error)

    return next();
}

export const updateTodoValidator = (req: Request, _res: Response, next: NextFunction) => {
    type UserData = zod.infer<typeof UpdateTodoSchema>;

    const userData: UserData = req.body;

    const result = UpdateTodoSchema.safeParse(userData);

    if (!result.success) return next(result.error)

    return next();
}