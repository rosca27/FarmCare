import { Request, Response, NextFunction } from "express";
import environment from "../utils/environment";
import { Unauthorized } from "../utils/errors";
import jwt from "jsonwebtoken";

const AuthValidator = (req: Request, res: Response, next: NextFunction) => {
    const authorizationheader = req.headers.authorization;

    if (!authorizationheader) {
        throw new Unauthorized("Missing auth token!");
    }
    if (!authorizationheader.includes(' ')) {
        throw new Unauthorized("Token is not valid!");
    }

    const [bearer, token] = authorizationheader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        throw new Unauthorized("Token is not valid!");
    }

    try {
        const user = jwt.verify(token, environment.JWT_SECRET) as any;
        req.body.user_info = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        next();
    } catch (err) {
        throw new Unauthorized("Token is not valid!");
    }
};

export default AuthValidator;