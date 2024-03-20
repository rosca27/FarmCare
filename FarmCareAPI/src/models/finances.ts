import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface FinancesAttributes {
    id: number;
    total_cost: number;
    total_income: number;
    farm_id: number;
}

export interface FinancesInput extends Optional<FinancesAttributes, 'id'> { }

export interface FinancesInstance extends Model<FinancesInput, FinancesAttributes>, FinancesAttributes {
    id: number;
    total_cost: number;
    total_income: number;
    farm_id: number;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const FinancesModel = db.define<FinancesInstance>('finances',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        total_cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        total_income: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    options
);

export default FinancesModel;