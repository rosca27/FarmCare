import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const costCreateValidator = [
    body("name")
        .exists().withMessage("Campul name este obligatoriu")
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("amount")
        .exists().withMessage("Campul amount este obligatoriu")
        .isFloat().withMessage("Campul amount trebuie sa fie un numar real"),
    body("crop_id")
        .exists().withMessage("Campul crop_id este obligatoriu")
        .isInt().withMessage("Campul crop_id trebuie sa fie un numar intreg"),
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

const costUpdateValidator = [
    body("name")
        .optional()
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("amount")
        .optional()
        .isFloat().withMessage("Campul amount trebuie sa fie un numar real"),
    body("crop_id")
        .optional()
        .isInt().withMessage("Campul crop_id trebuie sa fie un numar intreg"),
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

export { costCreateValidator, costUpdateValidator };