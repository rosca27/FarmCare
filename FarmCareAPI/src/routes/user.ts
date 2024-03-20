import UserController from "../controllers/userController";
const asyncHandler = require('express-async-handler')
import { Router } from "express";
import AuthValidator from "../middlewares/authMiddleware";

const router = Router();

router.route("/")
    .post(AuthValidator, asyncHandler(UserController.createUser))
    .get(AuthValidator, asyncHandler(UserController.getAllUsers));

router.route("/:id")
    .get(asyncHandler(UserController.getUser))
    .put(asyncHandler(UserController.updateUser))
    .delete(asyncHandler(UserController.deleteUser));

export default router;