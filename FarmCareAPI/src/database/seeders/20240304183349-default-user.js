'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Sergiu',
        last_name: 'Rosca',
        age: 22,
        role: 'admin',
        email: 'roscasergiu74@yahoo.com',
        password: '$2a$10$exdTmj3VDjBoRZpc/sj4q.lNNZuS108Uydhw9db9spGeAxZVLy.dC', //password but encrypted,
        created_at: new Date(),
      },
      {
        first_name: 'Lungu',
        last_name: 'Daniel',
        age: 23,
        role: 'farmer',
        email: 'lungud@yahoo.com',
        password: '$2a$10$exdTmj3VDjBoRZpc/sj4q.lNNZuS108Uydhw9db9spGeAxZVLy.dC', //password but encrypted,
        created_at: new Date(),
      },
      {
        first_name: 'Baci',
        last_name: 'Dragos',
        age: 23,
        role: 'farmer',
        email: 'bacidragos@yahoo.com',
        password: '$2a$10$exdTmj3VDjBoRZpc/sj4q.lNNZuS108Uydhw9db9spGeAxZVLy.dC', //password but encrypted,
        created_at: new Date(),
      },
      {
        first_name: 'Popescu`',
        last_name: 'Andrei',
        age: 40,
        role: 'farmer',
        email: 'popescuandrei@yahoo.com',
        password: '$2a$10$exdTmj3VDjBoRZpc/sj4q.lNNZuS108Uydhw9db9spGeAxZVLy.dC', //password but encrypted,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
