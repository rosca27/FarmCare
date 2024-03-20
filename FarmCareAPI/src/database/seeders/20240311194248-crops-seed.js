'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('crops', [
      {
        name: "Plantatie grau",
        planting_date: "2024-03-07",
        watering_interval_days: 25,
        minimum_growing_days: 90,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 2,
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: "Plantatie porumb",
        planting_date: "2024-03-07",
        watering_interval_days: 13,
        minimum_growing_days: 60,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 1,
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: "Plantatie orz",
        planting_date: "2024-03-07",
        watering_interval_days: 21,
        minimum_growing_days: 60,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 3,
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: "Plantatie rapita",
        planting_date: "2024-03-07",
        watering_interval_days: 8,
        minimum_growing_days: 120,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 4,
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: "Plantatie cartofi",
        planting_date: "2024-03-07",
        watering_interval_days: 5,
        minimum_growing_days: 90,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 5,
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: "Plantatie morcovi",
        planting_date: "2024-03-07",
        watering_interval_days: 10,
        minimum_growing_days: 70,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 6,
        farm_id: 3,
        created_at: new Date()
      },
      {
        name: "Plantatie varza",
        planting_date: "2024-03-07",
        watering_interval_days: 12,
        minimum_growing_days: 80,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 7,
        farm_id: 3,
        created_at: new Date()
      },
      {
        name: "Plantatie rosii",
        planting_date: "2024-03-07",
        watering_interval_days: 9,
        minimum_growing_days: 60,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 8,
        farm_id: 4,
        created_at: new Date()
      },
      {
        name: "Plantatie castraveti",
        planting_date: "2024-03-07",
        watering_interval_days: 7,
        minimum_growing_days: 50,
        description: "plant",
        plant_type_id: 9,
        farm_id: 4,
        created_at: new Date()
      },
      {
        name: "Plantatie dovleci",
        planting_date: "2024-03-07",
        watering_interval_days: 14,
        minimum_growing_days: 80,
        description: "plantat pe vreme rea, expectatii putine",
        plant_type_id: 10,
        farm_id: 5,
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('crops', null, {});
  }
};
