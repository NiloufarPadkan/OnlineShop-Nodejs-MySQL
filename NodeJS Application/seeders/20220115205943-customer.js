"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("customers", [
            {
                email: "niloufarpadkan@gmail.com",
                phone: "09915106340",
                fname: "niloofar",
                lname: "padkan",
                address: '["RASHT-GUILAN", "ANZALI-RAMEZANI", "ANZALI-GHAZIAN"]',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
