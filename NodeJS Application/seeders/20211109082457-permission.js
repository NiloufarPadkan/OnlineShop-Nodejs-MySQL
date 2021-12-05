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
            {
                title: "add permission",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read permission",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "assign permission",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read role-permission",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "add role",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read role",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "add category",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "delete category",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update category",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "add brand",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "delete brand",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update brand",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "add product",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "delete product",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update product",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "add tag",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "delete tag",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update tag",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read comment",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update comment",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "read report",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "update customer",
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
