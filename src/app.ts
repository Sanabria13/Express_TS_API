import express from 'express';
import config from 'config';
import DbConnection from '../utils/connectdb';
import logger from '../utils/logger';
import routes from './Routes';
import deserializeUser from './middlewares/deserializeUser';

const app = express();
app.use(express.json());
app.use(deserializeUser);

const port = config.get<number>('port') || 3000;
app.listen(port, async () => {
    logger.info(`Server start on port ${port}`);
    await DbConnection();
    routes(app);
});