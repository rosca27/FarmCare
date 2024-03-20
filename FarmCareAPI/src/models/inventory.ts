import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface InventoryAttributes {
    id: number;
    quantity: number;
    plant_type_id: number;
    farm_id: number;
}

export interface InventoryInput extends Optional<InventoryAttributes, 'id'> { }

export interface InventoryInstance extends Model<InventoryInput, InventoryAttributes>, InventoryAttributes {
    id: number;
    quantity: number;
    plant_type_id: number;
    farm_id: number;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const InventoryModel = db.define<InventoryInstance>('inventories',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        plant_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    options
);

export default InventoryModel;