import type {Request, Response} from 'express';
import { 
    createTodo, 
    updateTodo, 
    getSingleTodo,
    getAllTodo,
    deleteSingleTodo,
    deleteMultipleTodo,
    deleteAllTodo 
} from '../services/todoServices.js'; 
import { AppError } from '../utils/AppError.js';

export const createTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        
        const todoData = req.body

        const todo = await createTodo(userId!, todoData)

        return res.status(201).json({
            success: true,
            message: `Todo created successfully.`,
            data: todo
        })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message
            })
        } else {
            console.log(error)
            return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message: `Failed to create Todo.`
            })
        }
    }
}

