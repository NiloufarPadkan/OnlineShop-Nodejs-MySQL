"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */ return queryInterface.createTable("brands", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            PersianName: {
                type: Sequelize.STRING,
                allowNull: false,
                trim: true,
            },
            EnglishName: {
                type: Sequelize.STRING,
                allowNull: false,
                trim: true,
            },
            photo: {
                type: Sequelize.STRING,
                get: function () {
                    return JSON.parse(this.getDataValue("photo"));
                },
                set: function (val) {
                    return this.setDataValue("photo", JSON.stringify(val));
                },
            },
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
         */ return queryInterface.dropTable("brands");
    },
};
