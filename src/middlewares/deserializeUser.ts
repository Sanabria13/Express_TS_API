import { Request, NextFunction, Response } from 'express';
import { verifyJWT } from '../../utils/JWT';
import { get } from 'lodash';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const token = get(req, "headers.token");
    const refreshToken = get(req, "headers.refresh");
    if (!token) next();

    const { decoded, expired } = verifyJWT(token);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) { }
}

export default deserializeUser;