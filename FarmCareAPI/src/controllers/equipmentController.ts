import { Request, Response, NextFunction } from "express";
import EquipmentModel from "../models/equipment";
import { NotFound } from "../utils/errors";
import FarmModel from "../models/farm";

class EquipmentController {
    public static async createEquipment(req: Request, res: Response, next: NextFunction) {
        const equipment_data = {
            name: req.body.name,
            description: req.body.description,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(equipment_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const equipment = await EquipmentModel.create(equipment_data);
        return res.status(201).json({
            success: true,
            data: equipment
        });
    }

    public static async getEquipments(req: Request, res: Response, next: NextFunction) {
        const equipments = await EquipmentModel.findAll();
        return res.status(200).json({
            success: true,
            data: equipments
        });
    }

    public static async getEquipment(req: Request, res: Response, next: NextFunction) {
        const equipment = await EquipmentModel.findByPk(req.params.id, {
            include: ["farm"]
        });
        if (!equipment) {
            throw new NotFound("Equipment not found!");
        }
        return res.status(200).json({
            success: true,
            data: equipment
        });
    }

    public static async updateEquipment(req: Request, res: Response, next: NextFunction) {
        const equipment_data = {
            name: req.body.name,
            description: req.body.description,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(equipment_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const equipment = await EquipmentModel.findByPk(req.params.id);
        if (!equipment) {
            throw new NotFound("Equipment not found!");
        }
        await equipment.update(equipment_data);
        return res.status(200).json({
            success: true,
            data: equipment
        });
    }

    public static async deleteEquipment(req: Request, res: Response, next: NextFunction) {
        const equipment = await EquipmentModel.findByPk(req.params.id);
        if (!equipment) {
            throw new NotFound("Equipment not found!");
        }
        await equipment.destroy();
        return res.status(200).json({
            success: true,
            message: "Equipment deleted successfully!"
        });
    }

    public static async getEquipmentsByFarmId(req: Request, res: Response, next: NextFunction) {
        const farm_id = req.params.id;
        const farm = await FarmModel.findByPk(farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        const equipments = await EquipmentModel.findAll({
            where: {
                farm_id: farm_id
            }
        });
        return res.status(200).json({
            success: true,
            data: equipments
        });
    }
}

export default EquipmentController;