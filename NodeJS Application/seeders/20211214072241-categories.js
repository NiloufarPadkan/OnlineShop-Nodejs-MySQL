"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("categories", [
            {
                title: "دوچرخه",
                activityStatus: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "لوازم دوچرخه",
                parentId: 1,
                activityStatus: 1,

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "زین",
                parentId: 2,
                activityStatus: 1,

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "قطعات دوچرخه",
                parentId: 1,
                activityStatus: 1,
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
