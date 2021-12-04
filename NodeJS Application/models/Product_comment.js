const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product_comment = sequelize.define("Product_comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Product_comment;
