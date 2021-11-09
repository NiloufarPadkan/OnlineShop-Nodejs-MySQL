"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("rolepermissions", [
            {
                permissionId: "1",
                roleId: "1",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                permissionId: "2",
                roleId: "1",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                permissionId: "3",
                roleId: "1",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                permissionId: "4",
                roleId: "1",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                permissionId: "3",
                roleId: "2",

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
