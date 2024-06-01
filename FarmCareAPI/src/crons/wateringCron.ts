import cron from "node-cron";
import CropModel from "../models/crop";
import NotificationModel from "../models/notifications";

export const wateringCron = cron.schedule("0 1 * * *", async () => {
    const crops = await CropModel.findAll();

    const currentDate = new Date();

    for (const crop of crops) {
        const plantingDate = new Date(crop.planting_date);
        const wateringInterval = crop.watering_interval_days;
        const currentDate = new Date();

        const daysSincePlanting = Math.floor((currentDate.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSincePlanting % wateringInterval === 0) {
            const msg = `Crop with ID ${crop.id} should be watered.`;
            console.log(`Crop with ID ${crop.id} should be watered.`);
            await NotificationModel.create({
                title: "Crop Ready to harvest",
                message: msg,
                farm_id: crop.farm_id
            });
        }
    }
});