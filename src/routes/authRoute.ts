import express from "express";
import { registerUserController, loginUserController, refreshTokenController } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../middleware/auth.validator.js";

const router = express.Router();

router.post('/register', registerValidator, registerUserController);
router.post('/login', loginValidator, loginUserController);
router.post('/refresh', refreshTokenController)

export default router;