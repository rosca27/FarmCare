import { Router } from 'express';
import FinanceController from '../controllers/financesController';
import AuthValidator from '../middlewares/authMiddleware';
import { financeCreateValidator, financeUpdateValidator } from '../middlewares/validation/financeValidator';
import { numericIdParamValidator } from '../middlewares/validation/numericIdParamValidator';
const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(AuthValidator, asyncHandler(FinanceController.getFinances))
    .post(AuthValidator, financeCreateValidator, asyncHandler(FinanceController.createFinance));

router.route('/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(FinanceController.getFinance))
    .put(AuthValidator, numericIdParamValidator, financeUpdateValidator, asyncHandler(FinanceController.updateFinance))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(FinanceController.deleteFinance));

router.route("/farm/:id")
    .get(AuthValidator, numericIdParamValidator, asyncHandler(FinanceController.getFinanceByFarmId));

export default router;