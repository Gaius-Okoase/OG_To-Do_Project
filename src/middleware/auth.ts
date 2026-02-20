import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
interface DecodedToken {
    userId: string
}

// Extract authorization header
export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    // Verify header authorization properties
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("Authorization object missing.")
        return res.status(401).json({error: "Invalid or missing token."})
    }   
    if(!authHeader.startsWith("Bearer ")) {
        console.log("Malformed token.")
        return res.status(401).json({error: "Invalid or missing token."})
    }
    // Extract and verify token
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({error: "Invalid or missing token."})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as DecodedToken
        // Verify user still exists
        const userId = decodedToken.userId;
        const userExists = await User.findById({userId});
        if (!userExists) {
            return res.status(410).json({error: "User account no longer exists"})
        }
        req.userId = userId;    
    } catch (error) {
        console.log("Invalid token.")
        res.status(401).json({error: "Invalid or missing token."})
    }
    return next()
}   