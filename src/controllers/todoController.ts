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

export const updateTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const todoId = req.params.id as string;

        const todoData = req.body;

        const updatedTodo = await updateTodo(userId!, todoId, todoData)

        return res.status(200).json({
                success: true,
                message: `Todo updated successfully.`,
                data: updatedTodo
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
            error: error instanceof Error ? error.message: `Failed to update Todo.`
            })
        }
    }
}

export const getSingleTodoController = async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        
        const todoId = req.params.id;

        const todo = await getSingleTodo(userId!, todoId as string);

        return res.status(200).json({
            success: true,
            message: `Retrieved todo successfully.`,
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
            error: error instanceof Error ? error.message: `Failed to get Todo.`
            })
        }
    }
}

export const getAllTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const todos = await getAllTodo(userId!)

        return res.status(200).json({
            success: true,
            message: `Retrieved all todos successfully.`,
            data: todos
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
            error: error instanceof Error ? error.message: `Failed to get all todos.`
            })
        }
    }
}

export const deleteSingleTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        
        const todoId = req.params.id;

        const deletedTodo = await deleteSingleTodo(userId!, todoId as string);

        return res.status(200).json({
            success: true,
            message: `Deleted todo successfully.`,
            data: deletedTodo
        })

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message
            })
        } else {
            return res.status(500).json({
                success: false,
                error: error instanceof Error? error.message : `Failed to delete todo.`
            })
        }
    }
}

export const deleteMultipleTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const todoIds = req.body.ids;
        
        // Without destructure deletedTodos is an object with {deletedTodos} from service layer.
        const deletedTodos = await deleteMultipleTodo(userId!, todoIds as string[]);

        return res.status(200).json({
            success: true,
            message: `Deleted ${deletedTodos.deletedTodos.deletedCount} todo(s).`
        })
        
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message
            })
        } else {
            return res.status(500).json({
                success: false,
                error: error instanceof Error? error.message : `Failed to delete todo.`
            })
        }
    }
}

export const deleteAllTodoController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        
        // Destructure to access deletedTodos as a document
        const { deletedTodos } = await deleteAllTodo(userId!);

        return res.status(200).json({
            success: true,
            message: `Deleted ${deletedTodos.deletedCount} todo(s).`
        })
        
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message
            })
        } else {
            return res.status(500).json({
                success: false,
                error: error instanceof Error? error.message : `Failed to delete todo.`
            })
        }
    }
}