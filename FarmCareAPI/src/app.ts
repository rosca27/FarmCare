import express, { NextFunction, Request, Response } from 'express';
import environment from './utils/environment';
import db from './database/db_config';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
const { SequelizeStorage, Umzug } = require('umzug');
import router from './routes/routes';
import errorMiddleware from './middlewares/errorMiddleware';
import Associations from './models/associations';

const PORT = environment.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_req: Request, _res: Response, _next: NextFunction) => {
    _res.header('Access-Control-Allow-Origin', '*');
    _res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    _res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    _next();
});

const umzug = new Umzug({
    migrations: {
        glob: 'src/database/migrations/*.js',
        resolve: ({ name, path, context }: { name: string, path: string, context: any }) => {
            const migration = require(path)
            return {
                name,
                up: async () => migration.up(context, Sequelize),
                down: async () => migration.down(context, Sequelize),
            }
        },
    },
    context: db.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: db }),
    logger: console,
});

app.use('/api', router);

app.use(errorMiddleware);

Associations.init();

(async () => {
    try {
        await umzug.up();
        db.authenticate();
    } catch (err) {
        console.log(err);
    }
    app.listen(PORT, () => {
        console.log("Server is runnning on port: ", PORT);
    })
})()