'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          name: 'read',
        },
        {
          name: 'write',
        },
        {
          name: 'delete',
        },
        {
          name: 'share',
        },
        {
          name: 'upload',
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Permissions', null, {});
  }
};
