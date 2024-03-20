import { Request, Response, NextFunction } from "express";
import PlantTypeModel from "../models/plant_type";
import { NotFound } from "../utils/errors";

class PlantTypeController {
    public static async createPlantType(req: Request, res: Response, next: NextFunction) {
        const plant_type_data = {
            name: req.body.name
        };

        const plantType = await PlantTypeModel.create(plant_type_data);
        return res.status(201).json({
            success: true,
            data: plantType
        });
    }

    public static async getPlantTypes(req: Request, res: Response, next: NextFunction) {
        const plantTypes = await PlantTypeModel.findAll();
        return res.status(200).json({
            success: true,
            data: plantTypes
        });
    }

    public static async getPlantType(req: Request, res: Response, next: NextFunction) {
        const plant_type_id = req.params.id;
        const plantType = await PlantTypeModel.findByPk(plant_type_id);
        if (!plantType) {
            throw new NotFound("Plant type not found!");
        }
        return res.status(200).json({
            success: true,
            data: plantType
        });
    }

    public static async updatePlantType(req: Request, res: Response, next: NextFunction) {
        const plant_type_id = req.params.id;
        const plant_type_data = {
            name: req.body.name
        };

        const plantType = await PlantTypeModel.findByPk(plant_type_id);
        if (!plantType) {
            throw new NotFound("Plant type not found!");
        }
        await plantType.update(plant_type_data);
        return res.status(200).json({
            success: true,
            data: plantType
        });
    }

    public static async deletePlantType(req: Request, res: Response, next: NextFunction) {
        const plant_type_id = req.params.id;
        const plantType = await PlantTypeModel.findByPk(plant_type_id);
        if (!plantType) {
            throw new NotFound("Plant type not found!");
        }
        await plantType.destroy();
        return res.status(200).json({
            success: true,
            message: "Plant type deleted successfully!"
        });
    }
}

export default PlantTypeController;