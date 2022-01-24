const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Order = sequelize.define("order", {
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
        //    allowNull: false,
        trim: true,
    },
    totalTempPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        trim: true,
    },
    status: {
        type: Sequelize.STRING,
    },
    paymentId: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
});

module.exports = Order;
