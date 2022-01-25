"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("brands", [
            {
                PersianName: "المپیا",
                EnglishName: "Olympia",
                photo: "http://localhost:3001/uploads/olympia.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "کراس",
                EnglishName: "Cross",
                photo: "http://localhost:3001/uploads/cross.png",

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
                photo: "http://localhost:3001/uploads/giant.jpg",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "اورلورد",
                EnglishName: "overlord ",
                photo: "http://localhost:3001/uploads/overload.jpg",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "اینتس",
                EnglishName: "intense",
                photo: "http://localhost:3001/uploads/intense.jpg",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "بونیتو",
                EnglishName: "bonito",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                PersianName: "فیدو",
                EnglishName: "Fiido",
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
