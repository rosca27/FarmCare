import { Router } from 'express';
import InventoryController from '../controllers/inventoryController';
import AuthValidator from '../middlewares/authMiddleware';
import { inventoryCreateValidator, inventoryUpdateValidator } from '../middlewares/validation/inventoryValidator';
import { numericIdParamValidator } from '../middlewares/validation/numericIdParamValidator';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(AuthValidator, asyncHandler(InventoryController.getInventories))
    .post(AuthValidator, inventoryCreateValidator, asyncHandler(InventoryController.createInventory));

router.route('/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(InventoryController.getInventory))
    .put(AuthValidator, numericIdParamValidator, inventoryUpdateValidator, asyncHandler(InventoryController.updateInventory))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(InventoryController.deleteInventory));

router.route("/farm/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(InventoryController.getInventoryByFarmId));

export default router;