"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */ queryInterface.createTable("comments", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            visible: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                set: function (val) {
                    if (val === 1) return this.setDataValue("visible", true);
                    else return this.setDataValue("visible", false);
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
         */ return queryInterface.dropTable("comments");
    },
};
