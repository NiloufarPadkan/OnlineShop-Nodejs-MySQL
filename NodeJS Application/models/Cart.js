const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Cart = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    totalQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        trim: true,
    },
});

module.exports = Cart;
