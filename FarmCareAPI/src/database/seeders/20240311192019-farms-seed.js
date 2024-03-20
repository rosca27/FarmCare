'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('farms', [
      {
        name: 'Ferma Dragos Peris',
        location: 'Peris',
        user_id: 3,
        created_at: new Date()
      },
      {
        name: 'Ferma Dragos Reghin',
        location: 'Reghin',
        user_id: 3,
        created_at: new Date()
      },
      {
        name: 'Ferma Daniel',
        location: 'Somesu Rece',
        user_id: 2,
        created_at: new Date()
      },
      {
        name: 'Ferma familia Popescu',
        location: 'Sampetru de campie',
        user_id: 4,
        created_at: new Date()
      },
      {
        name: 'Ferma Andrei Satu Nou',
        location: 'Satu Nou',
        user_id: 4,
        created_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('farms', null, {});
  }
};
