import { Router } from 'express';
import CropController from '../controllers/cropController';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(asyncHandler(CropController.getCrops))
    .post(asyncHandler(CropController.createCrop));

router.route('/:id')
    .get(asyncHandler(CropController.getCrop))
    .put(asyncHandler(CropController.updateCrop))
    .delete(asyncHandler(CropController.deleteCrop));

router.route('/farm/:id')
    .get(asyncHandler(CropController.getCropsByFarm));

export default router;