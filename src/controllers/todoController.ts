import type {Request, Response, NextFunction} from 'express';
import { 
    createTodo, 
    updateTodo, 
    getSingleTodo,
    getAllTodo,
    deleteSingleTodo,
    deleteMultipleTodo,
    deleteAllTodo 
} from '../services/todoServices.js'; 


export const createTodoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        
        const todoData = req.body;

        const todo = await createTodo(userId!, todoData)

        return res.status(201).json({
            success: true,
            message: `Todo created successfully.`,
            data: todo
        })
    } catch (error) {
       return next(error);
    }
}

export const updateTodoController = async (req: Request, res: Response, next: NextFunction) => {
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
       return next(error);
    }
}

export const getSingleTodoController = async (req:Request, res:Response, next: NextFunction) => {
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
        return next(error);
    }
}

export const getAllTodoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;

        const todos = await getAllTodo(userId!)

        return res.status(200).json({
            success: true,
            message: `Retrieved all todos successfully.`,
            data: todos
        })
    } catch (error) {
        return next(error);
    }
}

export const deleteSingleTodoController = async (req: Request, res: Response, next: NextFunction) => {
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
        return next(error);
    }
}

export const deleteMultipleTodoController = async (req: Request, res: Response, next: NextFunction) => {
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
        return next(error);
    }
}

export const deleteAllTodoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        
        // Destructure to access deletedTodos as a document
        const { deletedTodos } = await deleteAllTodo(userId!);

        return res.status(200).json({
            success: true,
            message: `Deleted ${deletedTodos.deletedCount} todo(s).`
        })
        
    } catch (error) {
        return next(error);
    }
}