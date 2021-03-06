const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");
const Product = require("./Product");
const Product_tag = require("./Product_tag");

const Tag = sequelize.define("tag", {
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

module.exports = Tag;
