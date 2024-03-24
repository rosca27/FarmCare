import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

const farmCreateValidator = [
    body("name")
        .exists().withMessage("Campul name este obligatoriu")
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("location")
        .exists().withMessage("Campul location este obligatoriu")
        .isString().withMessage("Campul location trebuie sa fie un string"),
    body("user_id")
        .exists().withMessage("Campul user_id este obligatoriu")
        .isInt().withMessage("Campul user_id trebuie sa fie un numar intreg"),
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

const farmUpdateValidator = [
    body("name")
        .optional()
        .isString().withMessage("Campul name trebuie sa fie un string"),
    body("location")
        .optional()
        .isString().withMessage("Campul location trebuie sa fie un string"),
    body("user_id")
        .optional()
        .isInt().withMessage("Campul user_id trebuie sa fie un numar intreg"),
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

export { farmCreateValidator, farmUpdateValidator };