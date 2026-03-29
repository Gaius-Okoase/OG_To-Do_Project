import type { Request, Response, NextFunction } from "express";
import zod from "zod";
import { RegisterSchema, LoginSchema } from "../schemas/authSchema.js";

    // I gats write comment, make I no forget wetin I don know. 
    // Zod can infer static types from defined schema
    // Infer UserData as a type of RegisterSchema
    type UserData = zod.infer<typeof RegisterSchema>

export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
    const userData : UserData = req.body;

    const result = RegisterSchema.safeParse(userData);

    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }

    return next();
}