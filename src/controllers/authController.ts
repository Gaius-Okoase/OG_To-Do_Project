import type { Request, Response, NextFunction } from 'express';
import zod from "zod";
import { registerUser, loginUser, refreshToken } from '../services/authService.js';
import { RegisterSchema, LoginSchema } from '../schemas/authSchema.js';

type RegisterUser = zod.infer<typeof RegisterSchema>
type LoginUser = zod.infer<typeof LoginSchema>

// Register User
export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const userData: RegisterUser = req.body;
        
        const registrationResult = await registerUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: registrationResult
        })
    } catch (error) {
        next(error)
    }
}

// Log in User
export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: LoginUser = req.body;
        const loginResult = await loginUser(userData);

        res.status(200).json({
            success: true,
            message: "Login successfull",
            data: loginResult
        })
    } catch (error) {
        next(error)
    }    
}

// Rotate Access Token
export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string  = req.cookies;

        const newTokens = await refreshToken(token);

        res.status(200).json({
            success: true,
            data: newTokens
        })
    } catch (error) {
        next(error)
    }
}