import e, { Router } from "express";
import EquipmentController from "../controllers/equipmentController";
const asyncHandler = require('express-async-handler')

const router = Router();

router.route("/")
    .get(asyncHandler(EquipmentController.getEquipments))
    .post(asyncHandler(EquipmentController.createEquipment));

router.route("/:id")
    .get(asyncHandler(EquipmentController.getEquipment))
    .put(asyncHandler(EquipmentController.updateEquipment))
    .delete(asyncHandler(EquipmentController.deleteEquipment));

export default router;