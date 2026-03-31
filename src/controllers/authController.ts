import type { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/authService.js';

// Register User
export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData= req.body;
        
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
    const userData = req.body;

    try {
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