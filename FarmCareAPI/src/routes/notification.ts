import { Router } from 'express';
import NotificationController from '../controllers/notificationsController';
import AuthValidator from '../middlewares/authMiddleware';
import { notificationCreateValidator, notificationUpdateValidator } from '../middlewares/validation/notificationValidator';
import { numericIdParamValidator } from '../middlewares/validation/numericIdParamValidator';

const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(AuthValidator, asyncHandler(NotificationController.getNotifications))
    .post(AuthValidator, notificationCreateValidator, asyncHandler(NotificationController.createNotification));

router.route('/:id')
    .get(AuthValidator, numericIdParamValidator, asyncHandler(NotificationController.getNotification))
    .put(AuthValidator, numericIdParamValidator, notificationUpdateValidator, asyncHandler(NotificationController.updateNotification))
    .delete(AuthValidator, numericIdParamValidator, asyncHandler(NotificationController.deleteNotification));

export default router;