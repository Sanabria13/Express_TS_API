import { Express, Request, Response } from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controllers/SessionController';
import { createUserHandler } from '../controllers/userController';
import requireUser from '../middlewares/requireUser';
import validate from '../middlewares/validate';
import { createUserSessionSchema } from '../schema/session';
import { createUserSchema } from '../schema/user';

function routes(app: Express) {
    app.post('/api/users', validate(createUserSchema), createUserHandler);
    app.post('/api/sessions', validate(createUserSessionSchema), createUserSessionHandler);
    app.get('/api/sessions', requireUser, getUserSessionHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;