'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('equipments', [
      {
        name: 'Tractor Mavi',
        description: 'tractor de 100 cp',
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: 'Combina John Deere',
        description: 'combina de 100 cp',
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: 'Plug',
        description: 'plug de 2m',
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: 'Seminator',
        description: 'seminator de 3m',
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: 'Fertilizator',
        description: 'fertilizator de 2m',
        farm_id: 1,
        created_at: new Date()
      },
      {
        name: 'Tractor Massey Ferguson',
        description: 'tractor de 150 cp',
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: 'Combina Claas',
        description: 'combina de 250 cp',
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: 'Plug',
        description: 'plug de 3m',
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: 'Disc',
        description: 'disc pliabil',
        farm_id: 2,
        created_at: new Date()
      },
      {
        name: 'Tractor Case',
        description: 'tractor de 80 cp',
        farm_id: 3,
        created_at: new Date()
      },
      {
        name: 'Plug',
        description: 'plug de 3m',
        farm_id: 3,
        created_at: new Date()
      },
      {
        name: 'Disc',
        description: 'disc pliabil',
        farm_id: 3,
        created_at: new Date()
      },
      {
        name: 'Seminator',
        description: 'seminator rosii',
        farm_id: 3,
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('equipments', null, {});
  }
};
