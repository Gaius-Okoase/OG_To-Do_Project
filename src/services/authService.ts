import zod from "zod";
import jwt from "jsonwebtoken";
import { RegisterSchema, LoginSchema } from "../schemas/authSchema.js";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";
interface DecodedToken {
    userId: string
}

type RegisterUser = zod.infer<typeof RegisterSchema>;
type LoginUser = zod.infer<typeof LoginSchema>;

// Register user function
export const registerUser = async (userData: RegisterUser) => {
    const {firstName, lastName, email, password} = userData;

    const emailExists = await User.findOne({email: email});
    if (emailExists){
        throw new Error ('Email already exists')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save();

    return {
        user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        },
        accessToken,
        refreshToken
    }
}

//! Core values, Experience, Authority

// Login fucntion
export const loginUser = async (userData: LoginUser) => {
    const { email, password } = userData;

    const trimmedEmail = email.trim();

    // Check if user with email exists
    const user = await User.findOne({email: trimmedEmail}).select('+password')
    if (!user) {
        console.log("Email does not exist")
        throw new AppError (401, "Invalid Email or Password")
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        console.log(`Incorrect password`);
        throw new AppError (401, "Invalid Email or Password")
    }

    // Tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    return {
        user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        },
        accessToken,
        refreshToken
    }
}

// Refresh Access Token Function
export const refreshToken = async (refreshToken: string) => {
    try {
        // Check if token is valid
        const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as DecodedToken;
        
         // Extract user Id from token payload
         const userId = decodedToken.userId;

        // Check if token still exists in DB
        const user = await User.findOne({refreshToken})

        // Generate new token if token still exists and update DB
        if (user) {
            const newAccessToken = generateAccessToken(userId);
            const newRefreshToken = generateRefreshToken(userId);

            await User.findOneAndUpdate(
                {_id: userId},
                {refreshToken: newRefreshToken}
            );

            // Return access token and refresh token
            return {
                newAccessToken,
                newRefreshToken
            }
        } else{
            // Find user by id and wipe out the refresh token — force re-login
            await User.findByIdAndUpdate(userId, {refreshToken: null});
       
            // Throw expired token error.
            throw new AppError (401, "Token expired. Please log in again.")
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error
        } else {
            throw new AppError (401, "Invalid or Missing token")
        }
    }
}
