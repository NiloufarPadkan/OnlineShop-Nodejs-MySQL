const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Customer_ProductRating = sequelize.define("Customer_ProductRating", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Customer_ProductRating;
