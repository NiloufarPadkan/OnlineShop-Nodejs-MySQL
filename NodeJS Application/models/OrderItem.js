const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const OrderItem = sequelize.define("orderItem", {
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
    temp_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        trim: true,
    },
});

module.exports = OrderItem;
