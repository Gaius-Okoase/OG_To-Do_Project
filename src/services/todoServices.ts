import { Todo } from "../models/Todo.js";
import { AppError } from "../utils/AppError.js";

// Create Todo funtion
export const createTodo = async (userId: string, todoData: any) => {
    const { title, description, priority, deadline  } = todoData;

    const todo = await Todo.create({
        userId,
        title,
        description,
        priority,
        deadline
    })

    return {
        todo
    }
}

// Get Single Todo function
export const getSingleTodo = async (userId: string, todoId: string) => {

    const todo = await Todo.findOne({ _id: todoId, userId: userId });

    if (!todo) {
        throw new AppError(404, `Todo does not exist`)
    }

    return { todo }

}

// Get all Todo funtion
export const getAllTodo = async (userId: string) => {

    const todos = (await Todo.find({userId}).sort({createdAt: -1}));
    
    return { todos }
}

// Update Todo function
export const updateTodo = async (userId: string, todoId: string, todoData: any) => {

    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, userId},
        todoData,
        {new: true, runValidators: true}
    )

        if (!updatedTodo) {
        throw new AppError(404, `Todo does not exist`)
    }

    return {
        updatedTodo
    }
}

// Delete Todo function
export const deleteSingleTodo = async (userId: string, todoId: string) => {

    const deletedTodo = await Todo.findOneAndDelete({_id: todoId, userId: userId});

        if (!deletedTodo) {
        throw new AppError(404, `Todo does not exist`)
    }

    return { deletedTodo }
}

// Delete Multiple Todo
export const deleteMultipleTodo = async (userId: string, todoIds: string[]) => {

    const deletedTodos = await Todo.deleteMany({
        userId: userId,
        _id: {$in: todoIds}
    })
    
    return { deletedTodos }
}

// Delete All Todo
export const deleteAllTodo = async (userId: string) => {

    const deletedTodos = await Todo.deleteMany({userId})

    return { deletedTodos }
}