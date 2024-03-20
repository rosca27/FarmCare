import { Router } from 'express';
import NotificationController from '../controllers/notificationsController';

const asyncHandler = require('express-async-handler');

const router = Router();

router.route('/')
    .get(asyncHandler(NotificationController.getNotifications))
    .post(asyncHandler(NotificationController.createNotification));

router.route('/:id')
    .get(asyncHandler(NotificationController.getNotification))
    .put(asyncHandler(NotificationController.updateNotification))
    .delete(asyncHandler(NotificationController.deleteNotification));

export default router;