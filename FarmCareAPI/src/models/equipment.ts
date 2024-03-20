import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface EquipmentAttributes {
    id: number;
    name: string;
    description: string;
    farm_id: number;
}

export interface EquipementInput extends Optional<EquipmentAttributes, 'id'> { }

export interface EquipmentInstance extends Model<EquipementInput, EquipmentAttributes>, EquipmentAttributes {
    id: number;
    name: string;
    description: string;
    farm_id: number;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const EquipmentModel = db.define<EquipmentInstance>('equipments',
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
        description: {
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

export default EquipmentModel;