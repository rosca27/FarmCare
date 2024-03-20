import { Router } from "express";
import UserRoutes from './user';
import AuthRoutes from './auth';
import FarmRoutes from './farm';
import EquipmentRoutes from './equipment';
import InventoryRoutes from './inventory';
import CropRoutes from './crop';
import FinancesRoutes from './finances'
import PlantTypesRoutes from './plant_type';
import NotificationRoutes from './notification';
import CostRoutes from './cost';

const router = Router();

router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);
router.use('/farms', FarmRoutes);
router.use('/equipments', EquipmentRoutes);
router.use('/inventory', InventoryRoutes);
router.use('/crops', CropRoutes);
router.use('/finances', FinancesRoutes);
router.use('/plant_types', PlantTypesRoutes);
router.use('/notifications', NotificationRoutes);
router.use('/costs', CostRoutes);

export default router;
