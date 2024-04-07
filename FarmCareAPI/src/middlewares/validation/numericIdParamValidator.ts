//make a validator with express-validator for id param
import { param, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const numericIdParamValidator = [
    param("id")
        .exists().withMessage("Campul id este obligatoriu")
        .isInt().withMessage("Campul id trebuie sa fie un numar"),

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