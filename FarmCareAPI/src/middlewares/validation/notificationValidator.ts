import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const notificationCreateValidator = [
    body("title")
        .exists().withMessage("Campul title este obligatoriu"),
    body("message")
        .exists().withMessage("Campul message este obligatoriu"),
    body("farm_id")
        .exists().withMessage("Campul farm_id este obligatoriu")
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar "),
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

const notificationUpdateValidator = [
    body("title")
        .optional(),
    body("message")
        .optional(),
    body("farm_id")
        .optional()
        .isInt().withMessage("Campul farm_id trebuie sa fie un numar "),
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

export { notificationCreateValidator, notificationUpdateValidator };