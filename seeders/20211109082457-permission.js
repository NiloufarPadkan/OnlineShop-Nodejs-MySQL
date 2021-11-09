"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("permissions", [
            {
                title: "add admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "delete admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update admin",
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
