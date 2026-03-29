import express from "express";
import { registerUserController, loginUserController } from "../controllers/authController.js";
import { registerValidator } from "../middleware/validate.js";

const router = express.Router();

router.post('/register', registerValidator, registerUserController);
router.post('/login', loginUserController);

export default router;