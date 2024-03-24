import UserController from "../controllers/userController";
const asyncHandler = require('express-async-handler')
import { Router } from "express";
import AuthValidator from "../middlewares/authMiddleware";
import { userCreateValidator, userUpdateValidator } from "../middlewares/validation/userValidator";
import { numericIdParamValidator } from "../middlewares/validation/numericIdParamValidator";

const router = Router();

router.route("/")
    .post(AuthValidator, userCreateValidator, asyncHandler(UserController.createUser))
    .get(AuthValidator, asyncHandler(UserController.getAllUsers));

router.route("/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(UserController.getUser))
    .put(AuthValidator, numericIdParamValidator, userUpdateValidator, asyncHandler(UserController.updateUser))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(UserController.deleteUser));

export default router;