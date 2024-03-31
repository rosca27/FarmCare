import { Request, Response, NextFunction } from "express";
import FinancesModel from "../models/finances";
import { NotFound } from "../utils/errors";
import FarmModel from "../models/farm";

class FinanceController {
    public static async createFinance(req: Request, res: Response, next: NextFunction) {
        const finance_data = {
            total_cost: req.body.total_cost,
            total_income: req.body.total_income,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(finance_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const finance = await FinancesModel.create(finance_data);
        return res.status(201).json({
            success: true,
            data: finance
        });
    }

    public static async getFinances(req: Request, res: Response, next: NextFunction) {
        const finances = await FinancesModel.findAll();
        return res.status(200).json({
            success: true,
            data: finances
        });
    }

    public static async getFinance(req: Request, res: Response, next: NextFunction) {
        const finance_id = req.params.id;
        const finance = await FinancesModel.findByPk(finance_id, {
            include: ["farm"]
        });
        if (!finance) {
            throw new NotFound("Finance not found!");
        }
        return res.status(200).json({
            success: true,
            data: finance
        });
    }

    public static async updateFinance(req: Request, res: Response, next: NextFunction) {
        const finance_id = req.params.id;
        const finance_data = {
            total_cost: req.body.total_cost,
            total_income: req.body.total_income,
            farm_id: req.body.farm_id
        };

        const farm = await FarmModel.findByPk(finance_data.farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }

        const finance = await FinancesModel.findByPk(finance_id);
        if (!finance) {
            throw new NotFound("Finance not found!");
        }
        await finance.update(finance_data);
        return res.status(200).json({
            success: true,
            data: finance
        });
    }

    public static async deleteFinance(req: Request, res: Response, next: NextFunction) {
        const finance_id = req.params.id;
        const finance = await FinancesModel.findByPk(finance_id);
        if (!finance) {
            throw new NotFound("Finance not found!");
        }
        await finance.destroy();
        return res.status(200).json({
            success: true,
            message: "Finance deleted successfully!"
        });
    }

    public static async getFinanceByFarmId(req: Request, res: Response, next: NextFunction) {
        const farm_id = req.params.id;
        const farm = await FarmModel.findByPk(farm_id);
        if (!farm) {
            throw new NotFound("Farm not found!");
        }
        const finances = await FinancesModel.findAll({
            where: {
                farm_id: farm_id
            }
        });
        return res.status(200).json({
            success: true,
            data: finances
        });
    }
}

export default FinanceController;