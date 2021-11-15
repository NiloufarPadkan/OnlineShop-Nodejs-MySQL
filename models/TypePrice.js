const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const TypePrice = sequelize.define("TypePrice", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
});

module.exports = TypePrice;
