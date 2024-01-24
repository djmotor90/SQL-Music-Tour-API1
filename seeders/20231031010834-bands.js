'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Bands',[
    {
      name: 'Black Sabbath',
      genre: 'metal',
      available_start_time: ' 1970-01-01',
      end_time: '2020-01-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
  
  }
};
