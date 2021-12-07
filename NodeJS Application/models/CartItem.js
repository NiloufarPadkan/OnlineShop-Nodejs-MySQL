const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const CartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
    price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        trim: true,
    },
});

module.exports = CartItem;
