import { Router } from "express";
import AuthController from "../controllers/authController";
import loginValidator from "../middlewares/validation/loginValidator";
const asyncHandler = require('express-async-handler')

const router = Router();

router.post("/login", loginValidator, asyncHandler(AuthController.login));
router.post("/register", asyncHandler(AuthController.register));

export default router;
