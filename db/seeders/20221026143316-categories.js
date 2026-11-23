'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const icons = ['📁', '🌐', '💼', '🏦', '🎮', '🛒'];

    let categories = Array(10).fill(0).map((v, idx) => ({
      // id: idx,
      name: faker.company.bsNoun(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    
    await queryInterface.bulkInsert('Categories', categories)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
