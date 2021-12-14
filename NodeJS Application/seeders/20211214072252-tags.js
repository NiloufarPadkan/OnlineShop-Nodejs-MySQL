"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("tags", [
            {
                title: "دوچرخه",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "لباس ورزشی",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "کلاه",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "قفل",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "زین",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "قمقمه",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "تخفبف",
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
