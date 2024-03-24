import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const userCreateValidator = [
    body("first_name")
        .exists().withMessage("Campul first_name este obligatoriu"),
    body("last_name")
        .exists().withMessage("Campul last_name este obligatoriu"),
    body("age")
        .exists().withMessage("Campul age este obligatoriu")
        .isInt().withMessage("Campul age trebuie sa fie un numar"),
    body("role")
        .exists().withMessage("Campul role este obligatoriu")
        .custom(value => ['farmer', 'admin'].includes(value)).withMessage("Rolul trebuie sa fie farmer sau admin"),
    body("email")
        .exists().withMessage("Campul email este obligatoriu")
        .isEmail().withMessage("Format email invalid"),
    body("password")
        .exists().withMessage("Campul password este obligatoriu")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("confirmPassword")
        .exists().withMessage("Campul confirmPassword este obligatoriu")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            }
            return true;
        }),
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

const userUpdateValidator = [
    body("age")
        .isInt().withMessage("Campul age trebuie sa fie un numar"),
    body("role")
        .custom(value => ['farmer', 'admin'].includes(value)).withMessage("Rolul trebuie sa fie farmer sau admin"),
    body("email")
        .isEmail().withMessage("Format email invalid"),
    body("password")
        .not().exists().withMessage("Campul password nu poate fi modificat"),
    body("confirmPassword")
        .not().exists().withMessage("Campul confirmPassword nu poate fi modificat"),

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

export { userCreateValidator, userUpdateValidator }