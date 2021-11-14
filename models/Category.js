const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Category = sequelize.define("category", {
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
    photo: {
        type: Sequelize.BLOB,
    },
});

module.exports = Category;
