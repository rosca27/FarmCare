import express, { NextFunction, Request, Response } from 'express';
import environment from './utils/environment';
import db from './database/db_config';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
const { SequelizeStorage, Umzug } = require('umzug');
import router from './routes/routes';
import errorMiddleware from './middlewares/errorMiddleware';
import Associations from './models/associations';
import helmet from 'helmet';
import cors from 'cors';

const PORT = environment.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
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