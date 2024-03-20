import { Router } from 'express';
import FinanceController from '../controllers/financesController';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(asyncHandler(FinanceController.getFinances))
    .post(asyncHandler(FinanceController.createFinance));

router.route('/:id')
    .get(asyncHandler(FinanceController.getFinance))
    .put(asyncHandler(FinanceController.updateFinance))
    .delete(asyncHandler(FinanceController.deleteFinance));

export default router;