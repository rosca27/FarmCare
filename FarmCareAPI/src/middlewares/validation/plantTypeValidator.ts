import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const plantTypeValidator = [
    body("name")
        .exists().withMessage("Campul name este obligatoriu"),
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

export { plantTypeValidator };