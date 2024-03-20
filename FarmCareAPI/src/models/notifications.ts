import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface NotificationAttributes {
    id: number;
    title: string;
    message: string;
    farm_id: number;
}

export interface NotificationInput extends Optional<NotificationAttributes, 'id'> { }

export interface NotificationInstance extends Model<NotificationInput, NotificationAttributes>, NotificationAttributes {
    id: number;
    title: string;
    message: string;
    farm_id: number;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const NotificationModel = db.define<NotificationInstance>('notifications',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    options
);

export default NotificationModel;