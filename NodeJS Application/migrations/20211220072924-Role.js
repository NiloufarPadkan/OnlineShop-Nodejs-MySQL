"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */ queryInterface.createTable("roles", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                trim: true,
                unique: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                set: function (val) {
                    if (val === 1) return this.setDataValue("status", true);
                    else return this.setDataValue("status", false);
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
         */ return queryInterface.dropTable("roles");
    },
};
