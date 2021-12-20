"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.createTable("comment_reports", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            read_receipt: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                set: function (val) {
                    if (val === 1) return this.setDataValue("read_receipt", true);
                    else return this.setDataValue("read_receipt", false);
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
         */
        return queryInterface.dropTable("comment_reports");
    },
};
