'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crops', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      planting_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      watering_interval_days: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      harvesting_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      income: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('planted', 'ready to harvest', 'harvested'),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plant_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plant_types',
          key: 'id'
        },
        onUpdate: 'no action',
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
    await queryInterface.dropTable('crops');
  }
};
