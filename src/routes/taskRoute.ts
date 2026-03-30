import express from 'express';
import { 
    createTodoController, 
    updateTodoController ,
    getSingleTodoController,
    getAllTodoController,
    deleteSingleTodoController,
    deleteMultipleTodoController,
    deleteAllTodoController
} from '../controllers/todoController.js';

import { createTodoValidator } from '../middleware/task.validator.js';

const router = express.Router();

router.post('/create', createTodoValidator, createTodoController);
router.get('/get-one/:id', getSingleTodoController);
router.get('/get-all', getAllTodoController);
router.patch('/update/:id', updateTodoController);
router.delete('/delete-one/:id', deleteSingleTodoController);
router.delete('/delete-many', deleteMultipleTodoController);
router.delete('/delete-all', deleteAllTodoController)

export default router;