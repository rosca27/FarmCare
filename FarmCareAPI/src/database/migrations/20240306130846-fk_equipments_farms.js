'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('equipments', {
      fields: ['farm_id'],
      type: 'foreign key',
      name: 'fk_equipments_farms',
      references: {
        table: 'farms',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('equipments', 'fk_equipments_farms');
  }
};
