import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db_config";
import bcrypt from 'bcryptjs';

enum roles {
    'admin',
    'farmer'
}

interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    role: roles;
    email: string;
    password: string;
    confirmPassword: string;
}

const options = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTimeName: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserInput>, UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    role: roles;
    email: string;
    password: string;
};

const UserModel = db.define<UserInstance>('users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'farmer'),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmPassword: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                isPasswordMatch(value: string) {
                    if (value !== this.password) {
                        throw new Error('Password does not match');
                    }
                }
            }
        }
    },
    options,
);

UserModel.beforeCreate((user, _options) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

UserModel.beforeUpdate((user, _options) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

export default UserModel;