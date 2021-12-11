const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Permission = sequelize.define("permission", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
});

module.exports = Permission;
