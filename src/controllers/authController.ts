import type { Request, Response } from 'express';
import { registerUser } from '../services/authService.js';

export const register = async (req: Request, res: Response) => {
    try {
        const userData= req.body;
        
        const signUser = await registerUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: signUser
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        })
    }
}