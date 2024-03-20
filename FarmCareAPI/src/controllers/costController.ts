import { Request, Response, NextFunction } from "express";
import CostModel from "../models/cost";
import { NotFound } from "../utils/errors";
import CropModel from "../models/crop";

class CostController {
    public static async createCost(req: Request, res: Response, next: NextFunction) {
        const cost_data = {
            name: req.body.name,
            amount: req.body.amount,
            crop_id: req.body.crop_id
        };

        const crop = await CropModel.findByPk(+cost_data.crop_id);
        if (!crop) {
            throw new NotFound("Crop not found!");
        }

        const cost = await CostModel.create(cost_data);
        return res.status(201).json({
            success: true,
            data: cost
        });
    }

    public static async getCosts(req: Request, res: Response, next: NextFunction) {
        const costs = await CostModel.findAll();
        return res.status(200).json({
            success: true,
            data: costs
        });
    }

    public static async getCost(req: Request, res: Response, next: NextFunction) {
        const cost_id = req.params.id;
        const cost = await CostModel.findByPk(cost_id, {
            include: ["crop"]
        });
        if (!cost) {
            throw new NotFound("Cost not found!");
        }
        return res.status(200).json({
            success: true,
            data: cost
        });
    }

    public static async updateCost(req: Request, res: Response, next: NextFunction) {
        const cost_id = req.params.id;
        const cost_data = {
            name: req.body.name,
            amount: req.body.amount,
            crop_id: req.body.crop_id
        };

        const crop = await CropModel.findByPk(cost_data.crop_id);
        if (!crop) {
            throw new NotFound("Crop not found!");
        }

        const cost = await CostModel.findByPk(cost_id);
        if (!cost) {
            throw new NotFound("Cost not found!");
        }
        await cost.update(cost_data);
        return res.status(200).json({
            success: true,
            data: cost
        });
    }

    public static async deleteCost(req: Request, res: Response, next: NextFunction) {
        const cost_id = req.params.id;
        const cost = await CostModel.findByPk(cost_id);
        if (!cost) {
            throw new NotFound("Cost not found!");
        }
        await cost.destroy();
        return res.status(200).json({
            success: true,
            message: "Cost deleted successfully!"
        });
    }
}

export default CostController;