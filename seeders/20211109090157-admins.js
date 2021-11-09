"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("admins", [
            {
                username: "NiloufarPadkan",
                email: "niloufarpadkan@gmail.com",
                phone: "09915106340",
                avtivityStatus: true,
                hash: "0ca53992c04d39f0213db39a82ce3dc6b39ad0db2ba85950b0f994eedc359405fa4611c260cb86b058bc24a385b7ad47da7753db565a76da63ee25327cda86af",
                salt: "518d274ae92d9a00571f55406c774147cb5d10c6a24c50bf31e0ca39d5367821",
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "NegarPadkan",
                email: "negarpadkan@gmail.com",
                phone: "09116985490",
                avtivityStatus: true,
                hash: "0ca53992c04d39f0213db39a82ce3dc6b39ad0db2ba85950b0f994eedc359405fa4611c260cb86b058bc24a385b7ad47da7753db565a76da63ee25327cda86af",
                salt: "518d274ae92d9a00571f55406c774147cb5d10c6a24c50bf31e0ca39d5367821",
                roleId: 2,
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
