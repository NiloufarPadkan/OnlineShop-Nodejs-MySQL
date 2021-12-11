const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product_Rating = sequelize.define("Product_Rating", {
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

module.exports = Product_Rating;
