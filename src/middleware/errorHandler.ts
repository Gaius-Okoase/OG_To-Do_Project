import type { ErrorRequestHandler } from 'express';
import { AppError } from "../utils/AppError.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message 
        })
    } else if (error instanceof ZodError) {
        return res.status(400).json({ 
            success: false,
            error: error.issues
        })
    } else {
        return res.status(500).json({ 
            success: false,
            error: error.message 
        })
    }
}