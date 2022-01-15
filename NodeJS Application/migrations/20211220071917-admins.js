"use strict";
const Role = require("../models/Role");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface.createTable("admins", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                len: [4, 30],
                trim: true,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                trim: true,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING,
                trim: true,
                unique: true,
            },

            activityStatus: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                set: function (val) {
                    if (val === 1) return this.setDataValue("activityStatus", true);
                    else return this.setDataValue("activityStatus", false);
                },
            },
            hash: Sequelize.STRING,
            salt: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return queryInterface.dropTable("admins");
    },
};
