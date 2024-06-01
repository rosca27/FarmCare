import { Request, Response, NextFunction } from "express";
import NotificationsModel from "../models/notifications";
import { NotFound } from "../utils/errors";
import FarmModel from "../models/farm";

class NotificationController {
    public static async createNotification(req: Request, res: Response, next: NextFunction) {
        const notification_data = {
            title: req.body.title,
            message: req.body.message,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(notification_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const notification = await NotificationsModel.create(notification_data);
        return res.status(201).json({
            success: true,
            data: notification
        });
    }

    public static async getNotifications(req: Request, res: Response, next: NextFunction) {
        const notifications = await NotificationsModel.findAll();
        return res.status(200).json({
            success: true,
            data: notifications
        });
    }

    public static async getNotification(req: Request, res: Response, next: NextFunction) {
        const notification_id = req.params.id;
        const notification = await NotificationsModel.findByPk(notification_id, {
            include: ["farm"]
        });
        if (!notification) {
            throw new NotFound("Notification not found!");
        }
        return res.status(200).json({
            success: true,
            data: notification
        });
    }

    public static async updateNotification(req: Request, res: Response, next: NextFunction) {
        const notification_id = req.params.id;
        const notification_data = {
            title: req.body.title,
            message: req.body.message,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(notification_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const notification = await NotificationsModel.findByPk(notification_id);
        if (!notification) {
            throw new NotFound("Notification not found!");
        }
        await notification.update(notification_data);
        return res.status(200).json({
            success: true,
            data: notification
        });
    }

    public static async deleteNotification(req: Request, res: Response, next: NextFunction) {
        const notification_id = req.params.id;
        const notification = await NotificationsModel.findByPk(notification_id);
        if (!notification) {
            throw new NotFound("Notification not found!");
        }
        await notification.destroy();
        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully!"
        });
    }

    public static async getNotificationsByFarmId(req: Request, res: Response, next: NextFunction) {
        const farm_id = req.params.id;
        const farm = await FarmModel.findByPk(farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        const notifications = await NotificationsModel.findAll({
            where: {
                farm_id: farm_id
            },
            include: ["farm"]
        });
        return res.status(200).json({
            success: true,
            data: notifications
        });
    }
}

export default NotificationController;