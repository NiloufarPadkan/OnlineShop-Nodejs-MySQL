const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Customer = sequelize.define("customer", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        //allowNull: false,
        trim: true,
        unique: true,
    },
    fname: {
        type: Sequelize.STRING,
        //allowNull: false,
        trim: true,
    },
    lname: {
        type: Sequelize.STRING,
        //allowNull: false,
        trim: true,
    },
    phone: {
        type: Sequelize.STRING,
        // allowNull: false,
        trim: true,
        unique: true,
    },
    address: {
        type: Sequelize.STRING,
        // allowNull: false,
        trim: true,
    },

    avtivityStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = Customer;
