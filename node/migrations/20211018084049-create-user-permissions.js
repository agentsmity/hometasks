'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UsersPermissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'no action',
          onDelete: 'CASCADE'
        },
        permission_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Permissions',
            key: 'id'
          },
          onUpdate: 'no action',
          onDelete: 'CASCADE'
        }
      }
    );
    await queryInterface.addIndex(
      'UsersPermissions',
      ['user_id', 'permission_id'],
      {
        unique: true,
        name: 'user_permissions'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsersPermissions');
  }
};