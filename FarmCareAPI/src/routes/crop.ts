import { Router } from 'express';
import CropController from '../controllers/cropController';
import AuthValidator from '../middlewares/authMiddleware';
import { cropCreateValidator, cropUpdateValidator } from '../middlewares/validation/cropValidator';
import { numericIdParamValidator } from '../middlewares/validation/numericIdParamValidator';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(AuthValidator, asyncHandler(CropController.getCrops))
    .post(AuthValidator, cropCreateValidator, asyncHandler(CropController.createCrop));

router.route('/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(CropController.getCrop))
    .put(AuthValidator, numericIdParamValidator, cropUpdateValidator, asyncHandler(CropController.updateCrop))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(CropController.deleteCrop));

router.route('/farm/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(CropController.getCropsByFarm));

export default router;