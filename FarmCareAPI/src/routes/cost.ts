import { Router } from "express";
import CostController from "../controllers/costController";
import AuthValidator from "../middlewares/authMiddleware";
import { costCreateValidator, costUpdateValidator } from "../middlewares/validation/costValidator";
import { numericIdParamValidator } from "../middlewares/validation/numericIdParamValidator";
const asyncHandler = require("express-async-handler");

const router = Router();

router.route("/")
    .get(AuthValidator, asyncHandler(CostController.getCosts))
    .post(AuthValidator, costCreateValidator, asyncHandler(CostController.createCost));

router.route("/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(CostController.getCost))
    .put(AuthValidator, numericIdParamValidator, costUpdateValidator, asyncHandler(CostController.updateCost))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(CostController.deleteCost));

router.route("/crop/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(CostController.getCostsByCropId));

router.route("/farm/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(CostController.getCostsByFarmId));

export default router;