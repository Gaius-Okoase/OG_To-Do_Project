import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please fill in your first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please fill in your last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please fill in your email'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken:{
        type: String
    }    
}, {
    timestamps: true
});

// Pre-Save Hook
userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) {
        return next()
    }
    //const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Compare Password function for Login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Create model and export as module
export const User = mongoose.model('User', userSchema);