import type { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService.js';

// Register User
export const registerUserController = async (req: Request, res: Response) => {
    try {
        const userData= req.body;
        
        const registrationResult = await registerUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: registrationResult
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        })
    }
}

// Log in User
export const loginUserController = async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        const loginResult = await loginUser(userData);

        res.status(200).json({
            success: true,
            message: "Login successfull",
            data: loginResult
        })
    } catch (error) {
        console.error("Failed to log in user");
        res.status(400).json({
            success: false,
            message: error instanceof Error? error.message: "Invalid Email or Password"
        });
    }
    
}