import FarmModel from "../models/farm";
import { NextFunction, Request, Response } from "express";
import { NotFound } from "../utils/errors";
import UserModel from "../models/user";

class FarmController {
    public static async createFarm(req: Request, res: Response, next: NextFunction) {
        const farm_data = {
            name: req.body.name,
            location: req.body.location,
            user_id: req.body.user_id
        };

        const user = await UserModel.findByPk(farm_data.user_id);
        if (!user) {
            throw new NotFound("User not found!");
        }
        if (user.role !== "farmer" as any) {
            throw new NotFound("The user is not a farmer!");
        }

        const farm = await FarmModel.create(farm_data);
        return res.status(201).json({
            success: true,
            data: farm
        });
    }

    public static async getFarms(req: Request, res: Response, next: NextFunction) {
        const farms = await FarmModel.findAll();
        return res.status(200).json({
            success: true,
            data: farms
        });
    }

    public static async getFarm(req: Request, res: Response, next: NextFunction) {
        const farm = await FarmModel.findByPk(req.params.id, {
            include: ["user"]
        });
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        return res.status(200).json({
            success: true,
            data: farm
        });
    }

    public static async updateFarm(req: Request, res: Response, next: NextFunction) {
        const farm_data = {
            name: req.body.name,
            location: req.body.location,
            user_id: req.body.user_id
        };
        const farm = await FarmModel.findByPk(req.params.id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        await farm.update(farm_data);
        return res.status(200).json({
            success: true,
            data: farm
        });
    }

    public static async deleteFarm(req: Request, res: Response, next: NextFunction) {
        const farm = await FarmModel.findByPk(req.params.id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        await farm.destroy();
        return res.status(200).json({
            success: true,
            message: "Farm deleted successfully!"
        });
    }
}

export default FarmController;