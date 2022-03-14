import { DocumentDefinition, FilterQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/Session';
import { validatePassword } from './user';
import { verifyJWT } from '../../utils/JWT'
import { get } from 'lodash';


export async function createSession(userId: String, userAgent: String) {
    try {
        const session = await SessionModel.create({ user: userId, userAgent: userAgent });
        return session;
    } catch (error: any) {
        throw new Error(error);
    }

}
export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: FilterQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

export async function reAccsessToken(refreshToken: string) {
    const { decoded } = verifyJWT(refreshToken);
    if (!decoded || !get(decoded, "_id")) {
        return false;
    }
    const session = await SessionModel.findById(get(decoded, "_id"));
}