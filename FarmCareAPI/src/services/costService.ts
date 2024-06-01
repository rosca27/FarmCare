import CostModel from "../models/cost";
import CropModel from "../models/crop";

class CostService {
    public static async getCostsByFarmId(farm_id: number) {

        const costs = await CostModel.findAll({
            include: [{
                model: CropModel,
                as: "crop",
                where: {
                    farm_id: farm_id
                }
            }]
        });

        const total = costs.reduce((acc, cost) => {
            acc += cost.amount;
            return acc;
        }, 0);

        return [costs, total];
    }
}

export default CostService;