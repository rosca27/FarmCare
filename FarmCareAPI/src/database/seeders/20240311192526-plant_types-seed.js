'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('plant_types', [
      {
        name: "porumb",
        created_at: new Date()
      },
      {
        name: "grau",
        created_at: new Date()
      },
      {
        name: "orz",
        created_at: new Date()
      },
      {
        name: "rapita",
        created_at: new Date()
      },
      {
        name: "cartofi",
        created_at: new Date()
      },
      {
        name: "morcovi",
        created_at: new Date()
      },
      {
        name: "varza",
        created_at: new Date()
      },
      {
        name: "rosii",
        created_at: new Date()
      },
      {
        name: "castraveti",
        created_at: new Date()
      },
      {
        name: "dovleci",
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('plant_types', null, {});
  }
};
