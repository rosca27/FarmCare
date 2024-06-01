import { Request, Response, NextFunction } from "express";
import CropModel, { CropStatus } from "../models/crop";
import { NotFound } from "../utils/errors";
import FarmModel from "../models/farm";
import PlantTypeModel from "../models/plant_type";

class CropController {
    public static async createCrop(req: Request, res: Response, next: NextFunction) {
        const crop_data = {
            name: req.body.name,
            planting_date: req.body.planting_date,
            watering_interval_days: req.body.watering_interval_days,
            minimum_growing_days: req.body.minimum_growing_days,
            description: req.body.description,
            farm_id: req.body.farm_id,
            plant_type_id: req.body.plant_type_id,
            income: 0,
            status: "planted" as unknown as CropStatus,
            harvesting_date: null
        };

        const farm = await FarmModel.findByPk(crop_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const plant_type = await PlantTypeModel.findByPk(crop_data.plant_type_id);
        if (!plant_type) {
            throw new NotFound("Plant type not found!");
        }

        if (req.body.planting_date == "today") {
            crop_data.planting_date = new Date();
        }

        const crop = await CropModel.create(crop_data);
        return res.status(201).json({
            success: true,
            data: crop
        });
    }

    public static async getCrops(req: Request, res: Response, next: NextFunction) {
        const crops = await CropModel.findAll({
            include: {
                model: PlantTypeModel,
                as: "plant_type",
                attributes: ["name"]
            }
        });
        return res.status(200).json({
            success: true,
            data: crops
        });
    }

    public static async getCrop(req: Request, res: Response, next: NextFunction) {
        const crop_id = req.params.id;
        const crop = await CropModel.findByPk(crop_id, {
            include: ["farm", "plant_type"]
        });
        if (!crop) {
            throw new NotFound("Crop not found!");
        }
        return res.status(200).json({
            success: true,
            data: crop
        });
    }

    public static async updateCrop(req: Request, res: Response, next: NextFunction) {
        const crop_id = req.params.id;
        const crop_data = {
            name: req.body.name,
            planting_date: req.body.planting_date,
            watering_interval_days: req.body.watering_interval_days,
            minimum_growing_days: req.body.minimum_growing_days,
            description: req.body.description,
            farm_id: req.body.farm_id,
            plant_type_id: req.body.plant_type_id,
            income: req.body.income,
            status: req.body.status,
            harvesting_date: req.body.harvesting_date
        };

        const crop = await CropModel.findByPk(crop_id);
        if (!crop) {
            throw new NotFound("Crop not found!");
        }

        const farm = await FarmModel.findByPk(crop_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const plant_type = await PlantTypeModel.findByPk(crop_data.plant_type_id);
        if (!plant_type) {
            throw new NotFound("Plant type not found!");
        }

        if (req.body.planting_date == "today") {
            crop_data.planting_date = new Date();
        }

        await crop.update(crop_data);
        return res.status(200).json({
            success: true,
            data: crop
        });
    }

    public static async deleteCrop(req: Request, res: Response, next: NextFunction) {
        const crop_id = req.params.id;
        const crop = await CropModel.findByPk(crop_id);
        if (!crop) {
            throw new NotFound("Crop not found!");
        }
        await crop.destroy();
        return res.status(200).json({
            success: true,
            message: "Crop deleted successfully!"
        });
    }

    public static async getCropsByFarm(req: Request, res: Response, next: NextFunction) {
        const farm_id = req.params.id;
        const farm = await FarmModel.findByPk(farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        const crops = await farm.getCrops();
        return res.status(200).json({
            success: true,
            data: crops
        });
    }
}

export default CropController;