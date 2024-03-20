import environment from "../utils/environment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthService {
    public static async generateToken(payload: object): Promise<string> {
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Invalid payload: Must be an object');
        }

        const token = await jwt.sign(payload, environment.JWT_SECRET, {
            expiresIn: environment.JWT_EXPIRATION
        });
        return token;
    }

    public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

export default AuthService;