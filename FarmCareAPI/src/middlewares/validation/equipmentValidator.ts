import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const equipmentCreateValidator = [
    body("name")
        .exists().withMessage("Campul name este obligatoriu")
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("description")
        .exists().withMessage("Campul description este obligatoriu")
        .isString().withMessage("Campul description trebuie sa fie un string"),
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
                message: errMsg
            });
        } else {
            return next();
        }
    }
];

const equipmentUpdateValidator = [
    body("name")
        .optional()
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("description")
        .optional()
        .isString().withMessage("Campul description trebuie sa fie un string"),
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

export { equipmentCreateValidator, equipmentUpdateValidator };