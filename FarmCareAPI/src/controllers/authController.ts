import UserModel from "../models/user";
import { NextFunction, Request, Response } from "express";
import { NotFound } from "../utils/errors";
import AuthService from "../services/authService";

class AuthController {
    public static async login(req: Request, res: Response, next: NextFunction) {
        const user_data = {
            email: req.body.email,
            password: req.body.password
        };
        const user = await UserModel.findOne({
            where: {
                email: user_data.email
            },
            attributes: {
                include: ['password']
            }
        });
        if (!user) {
            throw new NotFound("User not found!");
        }
        const isPasswordValid = await AuthService.comparePassword(user_data.password, user.password);
        if (!isPasswordValid) {
            throw new NotFound("Incorrect Password!");
        }

        const token = await AuthService.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            success: true,
            data: user,
            token
        });
    }

    public static async register(req: Request, res: Response, next: NextFunction) {
        const user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: 'farmer' as any
        };
        const user = await UserModel.create(user_data);
        const token = await AuthService.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return res.status(201).json({
            success: true,
            data: user,
            token
        });
    }
}

export default AuthController;