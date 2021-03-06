const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const UserType = sequelize.define("UserType", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
});

module.exports = UserType;
