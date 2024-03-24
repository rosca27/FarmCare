import { Router } from 'express';
import PlantTypeController from '../controllers/plantTypeController';
import AuthValidator from '../middlewares/authMiddleware';
import { numericIdParamValidator } from '../middlewares/validation/numericIdParamValidator';
import { plantTypeValidator } from '../middlewares/validation/plantTypeValidator';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(AuthValidator, asyncHandler(PlantTypeController.getPlantTypes))
    .post(AuthValidator, plantTypeValidator, asyncHandler(PlantTypeController.createPlantType));

router.route('/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(PlantTypeController.getPlantType))
    .put(AuthValidator, plantTypeValidator, numericIdParamValidator, asyncHandler(PlantTypeController.updatePlantType), plantTypeValidator, numericIdParamValidator)
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(PlantTypeController.deletePlantType));

export default router;