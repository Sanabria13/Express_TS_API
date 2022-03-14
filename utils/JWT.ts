import jwt from 'jsonwebtoken';
import config from 'config';

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    const token = jwt.sign(object, config.get<string>("privatekeyJwt"), { ...(options && options) });
    return token;
}

export function verifyJWT(token: string) {

    try {
        const decoded = jwt.verify(token, config.get<string>("privatekeyJwt"));
        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message == "jwt expired",
            decoded: null
        };
    }
}