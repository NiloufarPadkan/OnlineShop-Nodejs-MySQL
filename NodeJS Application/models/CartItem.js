const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const CartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
    unit_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        trim: true,
    },
});

module.exports = CartItem;
