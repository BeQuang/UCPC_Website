'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Processes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER
      },
      paidImage: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      isPaid: {
        type: Sequelize.BOOLEAN
      },
      isUpdate: {
        type: Sequelize.BOOLEAN
      },
      isHighSchool: {
        type: Sequelize.BOOLEAN
      },
      trainerName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Processes');
  }
};