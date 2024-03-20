import db from "../database/db_config";
import { DataTypes, Model, Optional } from "sequelize";

interface FarmAttributes {
    id: number;
    name: string;
    location: string;
    user_id: number;
}

export interface FarmInput extends Optional<FarmAttributes, 'id'> { }

interface FarmInstance extends Model<FarmAttributes, FarmInput>, FarmAttributes {
    id: number;
    name: string;
    location: string;
    user_id: number;
    getCrops: Function;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const FarmModel = db.define<FarmInstance>('farms',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    options
);

export default FarmModel;