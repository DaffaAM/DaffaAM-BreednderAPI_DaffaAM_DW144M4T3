"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "users",
      [
        {
          breednder: "Aziz Nur Abdul Qodir",
          email: "azizaqibs@gmail.com",
          password: "Alqudwah123",
          phone: "08997775669",
          address: "kp.konohagakure",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    return queryInterface.bulkInsert("users", [{}], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // return queryInterface.bulkDelete('todos')
    return queryInterface.bulkDelete("users");
  }
};
