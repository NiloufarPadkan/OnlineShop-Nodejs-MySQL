const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product_views = sequelize.define("Product_views", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    IpList: {
        type: Sequelize.STRING,
    },
    viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Product_views;
