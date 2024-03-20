import { Router } from 'express';
import InventoryController from '../controllers/inventoryController';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(asyncHandler(InventoryController.getInventories))
    .post(asyncHandler(InventoryController.createInventory));

router.route('/:id')
    .get(asyncHandler(InventoryController.getInventory))
    .put(asyncHandler(InventoryController.updateInventory))
    .delete(asyncHandler(InventoryController.deleteInventory));

export default router;