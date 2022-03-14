import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { CreateUserInput } from '../schema/user';
import { createUser } from '../service/user';
import _ from 'lodash'

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        res.status(200).json(_.pick(user, 'name', 'email', 'createdAt'));
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}