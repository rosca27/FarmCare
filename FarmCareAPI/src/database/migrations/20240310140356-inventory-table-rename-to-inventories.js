'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('inventory', 'inventories');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('inventories', 'inventory');
  }
};
