import { Request, Response, NextFunction } from "express";
import InventoryModel from "../models/inventory";
import { NotFound } from "../utils/errors";
import FarmModel from "../models/farm";
import PlantTypeModel from "../models/plant_type";

class InventoryController {
    public static async createInventory(req: Request, res: Response, next: NextFunction) {
        const inventory_data = {
            plant_type_id: req.body.plant_type_id,
            quantity: req.body.quantity,
            farm_id: req.body.farm_id
        };

        const plant_type = await PlantTypeModel.findByPk(inventory_data.plant_type_id);
        if (!plant_type) {
            throw new NotFound("Plant type not found!");
        }

        const farm = await FarmModel.findByPk(inventory_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const inventory = await InventoryModel.create(inventory_data);
        return res.status(201).json({
            success: true,
            data: inventory
        });
    }

    public static async getInventories(req: Request, res: Response, next: NextFunction) {
        const inventories = await InventoryModel.findAll();
        return res.status(200).json({
            success: true,
            data: inventories
        });
    }

    public static async getInventory(req: Request, res: Response, next: NextFunction) {
        const inventory_id = req.params.id;
        const inventory = await InventoryModel.findByPk(inventory_id, {
            include: ["farm", "plant_type"]
        });
        if (!inventory) {
            throw new NotFound("Inventory not found!");
        }
        return res.status(200).json({
            success: true,
            data: inventory
        });
    }

    public static async updateInventory(req: Request, res: Response, next: NextFunction) {
        const inventory_id = req.params.id;
        const inventory_data = {
            plant_type_id: req.body.plant_type_id,
            quantity: req.body.quantity,
            farm_id: req.body.farm_id
        };

        const plant_type = await PlantTypeModel.findByPk(inventory_data.plant_type_id);
        if (!plant_type) {
            throw new NotFound("Plant type not found!");
        }

        const farm = await FarmModel.findByPk(inventory_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const inventory = await InventoryModel.findByPk(inventory_id);
        if (!inventory) {
            throw new NotFound("Inventory not found!");
        }
        await inventory.update(inventory_data);
        return res.status(200).json({
            success: true,
            data: inventory
        });
    }

    public static async deleteInventory(req: Request, res: Response, next: NextFunction) {
        const inventory_id = req.params.id;
        const inventory = await InventoryModel.findByPk(inventory_id);
        if (!inventory) {
            throw new NotFound("Inventory not found!");
        }
        await inventory.destroy();
        return res.status(200).json({
            success: true,
            message: "Inventory deleted successfully!"
        });
    }

    public static async getInventoryByFarmId(req: Request, res: Response, next: NextFunction) {
        const farm_id = req.params.id;
        const farm = await FarmModel.findByPk(farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        const inventories = await InventoryModel.findAll({
            where: {
                farm_id: farm_id
            }
        });
        return res.status(200).json({
            success: true,
            data: inventories
        });
    }
}

export default InventoryController;