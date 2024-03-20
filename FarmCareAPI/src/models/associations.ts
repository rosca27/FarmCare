import UserModel from "./user";
import FarmModel from "./farm";
import EquipmentModel from "./equipment";
import CostModel from "./cost";
import CropModel from "./crop";
import FinancesModel from "./finances";
import NotificationModel from "./notifications";
import PlantTypeModel from "./plant_type";
import InventoryModel from "./inventory";

class Associations {
    public static init() {
        UserModel.hasMany(FarmModel, {
            foreignKey: 'user_id',
            as: 'farms'
        });
        FarmModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });
        FarmModel.hasMany(EquipmentModel, {
            foreignKey: 'farm_id',
            as: 'equipments'
        });
        EquipmentModel.belongsTo(FarmModel, {
            foreignKey: 'farm_id',
            as: 'farm'
        });
        CropModel.hasMany(CostModel, {
            foreignKey: 'crop_id',
            as: 'costs'
        });
        CostModel.belongsTo(CropModel, {
            foreignKey: 'crop_id',
            as: 'crop'
        });
        FarmModel.hasMany(CropModel, {
            foreignKey: 'farm_id',
            as: 'crops'
        });
        CropModel.belongsTo(FarmModel, {
            foreignKey: 'farm_id',
            as: 'farm'
        });
        FarmModel.hasOne(FinancesModel, {
            foreignKey: 'farm_id',
            as: 'finances'
        });
        FinancesModel.belongsTo(FarmModel, {
            foreignKey: 'farm_id',
            as: 'farm'
        });
        FarmModel.hasMany(NotificationModel, {
            foreignKey: 'farm_id',
            as: 'notifications'
        });
        NotificationModel.belongsTo(FarmModel, {
            foreignKey: 'farm_id',
            as: 'farm'
        });
        PlantTypeModel.hasOne(CropModel, {
            foreignKey: 'plant_type_id',
            as: 'crop'
        });
        CropModel.belongsTo(PlantTypeModel, {
            foreignKey: 'plant_type_id',
            as: 'plant_type'
        });
        FarmModel.hasMany(InventoryModel, {
            foreignKey: 'farm_id',
            as: 'inventories'
        });
        InventoryModel.belongsTo(FarmModel, {
            foreignKey: 'farm_id',
            as: 'farm'
        });
        PlantTypeModel.hasOne(InventoryModel, {
            foreignKey: 'plant_type_id',
            as: 'inventory'
        });
        InventoryModel.belongsTo(PlantTypeModel, {
            foreignKey: 'plant_type_id',
            as: 'plant_type'
        });
    }
}

export default Associations;