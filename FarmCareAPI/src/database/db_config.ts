import { Dialect, Sequelize } from "sequelize";
import environment from "../utils/environment";

const db = new Sequelize(environment.DATABASE_NAME as string, environment.DATABASE_USERNAME as string, environment.DATABASE_PASSWORD, {
    host: environment.DATABASE_HOST,
    dialect: environment.DATABASE_DIALECT as Dialect,
    port: +environment.DATABASE_PORT
});

export default db;