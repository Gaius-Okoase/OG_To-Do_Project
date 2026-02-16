import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

// Register user function
export const registerUser = async (userData: any) => {
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