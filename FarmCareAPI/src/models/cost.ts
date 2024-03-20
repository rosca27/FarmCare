import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface CostAttributes {
    id: number;
    name: string;
    amount: number;
    crop_id: number;
}

export interface CostInput extends Optional<CostAttributes, 'id'> { }

export interface CostInstance extends Model<CostInput, CostAttributes>, CostAttributes {
    id: number;
    name: string;
    amount: number;
    crop_id: number;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const CostModel = db.define<CostInstance>('costs',
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
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        crop_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    options
);

export default CostModel;