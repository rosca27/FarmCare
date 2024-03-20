import { Router } from "express";
import CostController from "../controllers/costController";
const asyncHandler = require("express-async-handler");

const router = Router();

router.route("/")
    .get(asyncHandler(CostController.getCosts))
    .post(asyncHandler(CostController.createCost));

router.route("/:id")
    .get(asyncHandler(CostController.getCost))
    .put(asyncHandler(CostController.updateCost))
    .delete(asyncHandler(CostController.deleteCost));

export default router;