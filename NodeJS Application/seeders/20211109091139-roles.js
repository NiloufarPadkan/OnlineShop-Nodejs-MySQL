"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("roles", [
            {
                role: "root",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role: "user",
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
