import { Request, NextFunction, Response } from 'express';
import { AnyZodObject } from 'zod'
import logger from '../../utils/logger';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (e: any) {
        return res.status(409).send(e.errors);
    }
}

export default validate;
