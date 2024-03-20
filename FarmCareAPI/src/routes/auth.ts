import { Router } from "express";
import AuthController from "../controllers/authController";
const asyncHandler = require('express-async-handler')

const router = Router();

router.post("/login", asyncHandler(AuthController.login));

export default router;
