import { Todo } from "../models/Task.js";

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
    todo.save()

    return {
        todo
    }
}

