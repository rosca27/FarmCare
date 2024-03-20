import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { NotFound } from "../utils/errors";

class UserController {
    public static async createUser(req: Request, res: Response, next: NextFunction) {
        const user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
        const user = await UserModel.create(user_data);
        res.status(200).json({
            success: true,
            data: user
        });
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await UserModel.findAll();
        res.status(200).json({
            success: true,
            data: users
        });
    }

    public static async getUser(req: Request, res: Response, next: NextFunction) {
        const user_id = req.params.id;
        const user = await UserModel.findByPk(user_id, {
            include: ["farms"]
        });
        if (!user) {
            throw new NotFound("User not found");
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction) {
        const user_id = req.params.id;
        const user = await UserModel.findByPk(user_id);
        if (!user) {
            throw new NotFound("User not found");
        }
        const user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
        await user.update(user_data);
        res.status(200).json({
            success: true,
            data: user
        });
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction) {
        const user_id = req.params.id;
        const user = await UserModel.findByPk(user_id);
        if (!user) {
            throw new NotFound("User not found");
        }
        await user.destroy();
        res.status(200).json({
            success: true,
            message: "User deleted successfully!"
        });
    }
}

export default UserController;