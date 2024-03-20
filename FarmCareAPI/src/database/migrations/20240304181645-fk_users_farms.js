'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('farms', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_farm',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'no action'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('farms', 'fk_user_farm');
  }
};
