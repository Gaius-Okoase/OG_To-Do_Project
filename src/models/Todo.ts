import mongoose from 'mongoose';
type PriorityType = "low" | "medium" | "high"
interface ITodo {
    userId: mongoose.Types.ObjectId,
    title: string,
    description: string,
    priority: PriorityType
    deadline: Date,
    isCompleted: boolean
}

const todoSchema = new mongoose.Schema<ITodo, mongoose.Model<ITodo>>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 100,
        trim: true
    },
    priority:{
        type: String,
        lowercase: true,
        enum: ["low", "medium", "high"],
        default: "medium",
        required: true
    },
    deadline: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Todo = mongoose.model('Todo', todoSchema);