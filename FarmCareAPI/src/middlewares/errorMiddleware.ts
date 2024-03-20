import { NextFunction, Request, Response } from "express";
import environment from "../utils/environment";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (environment.NODE_ENV === "development") {
        return res.status(err.statusCode ?? 500).json({
            success: "false",
            message: err.message ?? err,
            stack: err.stack
        });
    } else {
        return res.status(err.statusCode).json({
            success: "false",
            message: err.message ?? err,
        });
    }
};

export default errorMiddleware;