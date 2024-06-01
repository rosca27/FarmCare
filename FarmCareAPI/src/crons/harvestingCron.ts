import cron from "node-cron";

import CropModel, { CropStatus } from "../models/crop";
import NotificationModel from "../models/notifications";


export const harvestingCron = cron.schedule("0 1 * * *", async () => {
    const crops = await CropModel.findAll();

    for (const crop of crops) {
        const plantingDate = new Date(crop.planting_date);
        const currentDate = new Date();
        const minimumDaysToGrow = crop.minimum_growing_days;

        const harvestDate = new Date(plantingDate.getTime() + minimumDaysToGrow * 24 * 60 * 60 * 1000);

        if (harvestDate <= currentDate && crop.status != CropStatus.harvested) {
            const msg = `Crop Ready to harvest ${crop.name} with planting date ${plantingDate.toISOString().split('T')[0]} and harvest date ${harvestDate.toISOString().split('T')[0]}`;
            await NotificationModel.create({
                title: "Crop Ready to harvest",
                message: msg,
                farm_id: crop.farm_id
            });
            console.log(`Crop Ready to harvest ${crop.name} with planting date ${plantingDate.toISOString().split('T')[0]} and harvest date ${harvestDate.toISOString().split('T')[0]}`);
            crop.status = CropStatus["ready to harvest"];
            await crop.save();
        }
    }
});