/* make a validator, create and update for crop model
name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        planting_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        watering_interval_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        minimum_growing_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        harvesting_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        income: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('planted', 'ready to harvest', 'harvested'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plant_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }*/

import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const cropCreateValidator = [
    body("name")
        .exists().withMessage("Campul name este obligatoriu")
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("planting_date")
        .exists().withMessage("Campul planting_date este obligatoriu")
        .isDate().withMessage("Campul planting_date trebuie sa fie o data"),
    body("watering_interval_days")
        .exists().withMessage("Campul watering_interval_days este obligatoriu")
        .isInt().withMessage("Campul watering_interval_days trebuie sa fie un numar intreg"),
    body("minimum_growing_days")
        .exists().withMessage("Campul minimum_growing_days este obligatoriu")
        .isInt().withMessage("Campul minimum_growing_days trebuie sa fie un numar intreg"),
    body("status")
        .exists().withMessage("Campul status este obligatoriu")
        .isString().withMessage("Campul status trebuie sa fie un string")
        .custom((value) => ['planted', 'ready to harvest', 'harvested'].includes(value)).withMessage("Campul status trebuie sa fie una dintre valorile: 'planted', 'ready to harvest', 'harvested'"),
    body("description")
        .exists().withMessage("Campul description este obligatoriu")
        .isString().withMessage("Campul description trebuie sa fie un string"),
    body("plant_type_id")
        .exists().withMessage("Campul plant_type_id este obligatoriu")
        .isInt().withMessage("Campul plant_type_id trebuie sa fie un numar intreg"),
    body("farm_id")
        .exists().withMessage("Campul farm_id este obligatoriu")
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar intreg"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errArray = errors.array();
            const errMsg = errArray[0].msg ?? "Invalid input";
            return res.status(400).json({
                success: false,
                errors: errMsg
            });
        } else {
            return next();
        }
    }
];

const cropUpdateValidator = [
    body("name")
        .optional()
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("planting_date")
        .optional()
        .isDate().withMessage("Campul planting_date trebuie sa fie o data"),
    body("watering_interval_days")
        .optional()
        .isInt().withMessage("Campul watering_interval_days trebuie sa fie un numar intreg"),
    body("minimum_growing_days")
        .optional()
        .isInt().withMessage("Campul minimum_growing_days trebuie sa fie un numar intreg"),
    body("status")
        .optional()
        .isString().withMessage("Campul status trebuie sa fie un string")
        .custom((value) => ['planted', 'ready to harvest', 'harvested'].includes(value)).withMessage("Campul status trebuie sa fie una dintre valorile: 'planted', 'ready to harvest', 'harvested'"),
    body("description")
        .optional()
        .isString().withMessage("Campul description trebuie sa fie un string"),
    body("plant_type_id")
        .optional()
        .isInt().withMessage("Campul plant_type_id trebuie sa fie un numar intreg"),
    body("farm_id")
        .optional()
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar intreg"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errArray = errors.array();
            const errMsg = errArray[0].msg ?? "Invalid input";
            return res.status(400).json({
                success: false,
                errors: errMsg
            });
        } else {
            return next();
        }
    }
];

export { cropCreateValidator, cropUpdateValidator };