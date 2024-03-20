import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";

interface PlantTypeAttributes {
    id: number;
    name: string;
}

export interface PlantTypeInput extends Optional<PlantTypeAttributes, 'id'> { }

export interface PlantTypeInstance extends Model<PlantTypeInput, PlantTypeAttributes>, PlantTypeAttributes {
    id: number;
    name: string;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
}

const PlantTypeModel = db.define<PlantTypeInstance>('plant_types',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    options
);


export default PlantTypeModel;