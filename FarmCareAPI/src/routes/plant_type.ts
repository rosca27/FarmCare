import { Router } from 'express';
import PlantTypeController from '../controllers/plantTypeController';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(asyncHandler(PlantTypeController.getPlantTypes))
    .post(asyncHandler(PlantTypeController.createPlantType));

router.route('/:id')
    .get(asyncHandler(PlantTypeController.getPlantType))
    .put(asyncHandler(PlantTypeController.updatePlantType))
    .delete(asyncHandler(PlantTypeController.deletePlantType));

export default router;