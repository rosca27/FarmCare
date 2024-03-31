import e, { Router } from "express";
import EquipmentController from "../controllers/equipmentController";
import AuthValidator from "../middlewares/authMiddleware";
import { equipmentCreateValidator, equipmentUpdateValidator } from "../middlewares/validation/equipmentValidator";
import { numericIdParamValidator } from "../middlewares/validation/numericIdParamValidator";
const asyncHandler = require('express-async-handler')

const router = Router();

router.route("/")
    .get(AuthValidator, asyncHandler(EquipmentController.getEquipments))
    .post(AuthValidator, equipmentCreateValidator, asyncHandler(EquipmentController.createEquipment));

router.route("/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(EquipmentController.getEquipment))
    .put(AuthValidator, numericIdParamValidator, equipmentUpdateValidator, asyncHandler(EquipmentController.updateEquipment))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(EquipmentController.deleteEquipment));

router.route("/farm/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(EquipmentController.getEquipmentsByFarmId));

export default router;