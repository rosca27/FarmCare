// make a validation middleware for inventory

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const inventoryCreateValidator = [
    body("farm_id")
        .exists().withMessage("Campul farm_id este obligatoriu")
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar intreg"),
    body("quantity")
        .exists().withMessage("Campul quantity este obligatoriu")
        .isInt().withMessage("Campul quantity trebuie sa fie un numar intreg"),
    body("plant_type_id")
        .exists().withMessage("Campul plant_type_id este obligatoriu")
        .isInt().withMessage("Campul plant_type_id trebuie sa fie un numar intreg"),
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

const inventoryUpdateValidator = [
    body("farm_id")
        .optional()
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar intreg"),
    body("quantity")
        .optional()
        .isInt().withMessage("Campul quantity trebuie sa fie un numar intreg"),
    body("plant_type_id")
        .optional()
        .isInt().withMessage("Campul plant_type_id trebuie sa fie un numar intreg"),
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

export { inventoryCreateValidator, inventoryUpdateValidator };