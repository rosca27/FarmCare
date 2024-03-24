import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const loginValidator = [
    body("email")
        .exists().withMessage("Campul email este obligatoriu")
        .isEmail().withMessage("Format email invalid"),
    body("password")
        .exists().withMessage("Campul password este obligatoriu")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

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

export default loginValidator;