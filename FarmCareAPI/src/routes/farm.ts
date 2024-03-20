import { Router } from "express";
import FarmController from "../controllers/farmController";
const asyncHandler = require('express-async-handler')

const router = Router();

router.route("/")
    .post(asyncHandler(FarmController.createFarm))
    .get(asyncHandler(FarmController.getFarms));

router.route("/:id")
    .get(asyncHandler(FarmController.getFarm))
    .put(asyncHandler(FarmController.updateFarm))
    .delete(asyncHandler(FarmController.deleteFarm));

export default router;