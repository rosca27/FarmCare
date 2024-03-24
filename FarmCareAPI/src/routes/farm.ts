import { Router } from "express";
import FarmController from "../controllers/farmController";
import AuthValidator from "../middlewares/authMiddleware";
import { numericIdParamValidator } from "../middlewares/validation/numericIdParamValidator";
const asyncHandler = require('express-async-handler')

const router = Router();

router.route("/")
    .post(AuthValidator, asyncHandler(FarmController.createFarm))
    .get(AuthValidator, asyncHandler(FarmController.getFarms));

router.route("/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(FarmController.getFarm))
    .put(AuthValidator, numericIdParamValidator, asyncHandler(FarmController.updateFarm))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(FarmController.deleteFarm));

export default router;