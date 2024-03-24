import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const financeCreateValidator = [
    body("total_cost")
        .exists().withMessage("Campul total_cost este obligatoriu")
        .isFloat().withMessage("Campul total_cost trebuie sa fie un numar intreg"),
    body("total_income")
        .exists().withMessage("Campul total_income este obligatoriu")
        .isInt().withMessage("Campul total_income trebuie sa fie un numar intreg"),
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

const financeUpdateValidator = [
    body("total_cost")
        .optional()
        .isInt().withMessage("Campul total_cost trebuie sa fie un numar intreg"),
    body("total_income")
        .optional()
        .isInt().withMessage("Campul total_income trebuie sa fie un numar intreg"),
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

export { financeCreateValidator, financeUpdateValidator };