import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

export enum CropStatus {
    'planted',
    'ready to harvest',
    'harvested'
}

interface CropAttributes {
    id: number;
    name: string;
    planting_date: Date;
    harvesting_date: Date;
    watering_interval_days: number;
    minimum_growing_days: number;
    income: number;
    status: CropStatus;
    description: string;
    plant_type_id: number;
    farm_id: number;
}

export interface CropInput extends Optional<CropAttributes, 'id'> { }

export interface CropInstance extends Model<CropInput, CropAttributes>, CropAttributes {
    id: number;
    name: string;
    planting_date: Date;
    harvesting_date: Date;
    watering_interval_days: number;
    minimum_growing_days: number;
    income: number;
    status: CropStatus;
    description: string;
    plant_type_id: number;
    farm_id: number;
}
const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const CropModel = db.define<CropInstance>('crops',
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
        planting_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        watering_interval_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        minimum_growing_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        harvesting_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        income: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('planted', 'ready to harvest', 'harvested'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plant_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    options
);

export default CropModel;