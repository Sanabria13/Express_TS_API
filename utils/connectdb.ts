import mongoose from "mongoose";
import config from "config";
import logger from './logger';

async function DbConnection() {
    try {
        await mongoose.connect(config.get<string>("dbConnect")).then(() => {
            logger.info("Successfully connected to database");
        })
    } catch (error) {
        logger.error("can not connect to db");
        process.exit(1);
    }
}

export default DbConnection 