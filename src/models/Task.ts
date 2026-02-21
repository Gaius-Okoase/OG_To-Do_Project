import mongoose from 'mongoose';
type PriorityType = "low" | "medium" | "high"
interface ITask {
    userId: mongoose.Types.ObjectId,
    title: string,
    description: string,
    priority: PriorityType
    deadline: Date,
    isCompleted: boolean
}

const taskSchema = new mongoose.Schema<ITask, mongoose.Model<ITask>>({
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

export const Task = mongoose.model('Task', taskSchema);