'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'first',
          password: 'password1',
          age: 30
        },
        {
          login: 'second',
          password: 'password2',
          age: 32
        },
        {
          login: 'third',
          password: 'password3',
          age: 33
        },
        {
          login: 'fourth',
          password: 'password4',
          age: 34
        },
        {
          login: 'fives',
          password: 'password5',
          age: 35
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
