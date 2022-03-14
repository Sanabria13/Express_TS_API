import { Request, Response } from 'express';
import { signJWT, verifyJWT } from '../../utils/JWT';
import { createSession, findSession, updateSession } from '../service/session';
import { validatePassword } from '../service/user';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body.email, req.body.password);

    if (!user) {
        return res.status(401).send("invalid email or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = signJWT({
        ...user, session: session._id
    }, {
        expiresIn: config.get("accessTokenTl")
    });

    const refreshToken = signJWT({
        ...user, session: session._id
    }, {
        expiresIn: config.get("refreshTokenTl")
    });

    return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const user = res.locals.user;
    const session = await findSession({ user: user._id, valid: false });
    return res.status(200).json({ session: session });
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: true });
    return res.send({ accessToken: null, refreshToken: null });
}

