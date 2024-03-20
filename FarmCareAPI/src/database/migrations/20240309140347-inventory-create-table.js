'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      plant_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plant_types',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'farms',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventory');
  }
};
