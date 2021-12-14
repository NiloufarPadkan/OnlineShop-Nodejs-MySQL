"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("categories", [
            {
                title: "دوچرخه",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "لوازم دوچرخه",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "قطعات دوچرخه",
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
