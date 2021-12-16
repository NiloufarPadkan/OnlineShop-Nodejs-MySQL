const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product_tag = sequelize.define("Product_tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Product_tag;
