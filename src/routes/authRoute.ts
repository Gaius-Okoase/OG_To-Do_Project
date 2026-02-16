import express from "express";
import { registerUserController } from "../controllers/authController.js";

const router = express.Router();

router.post('/api/auth/register', registerUserController);

export default router;