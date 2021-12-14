"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("brands", [
            {
                PersianName: "المپیا",
                EnglishName: "Olympia",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "کراس",
                EnglishName: "Cross",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "ویوا",

                EnglishName: "Viva ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "جاینت",
                EnglishName: "giant ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "اورلورد",
                EnglishName: "overlord ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "اینتس",
                EnglishName: "intense",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "بونیتو",
                EnglishName: "bonito",
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
