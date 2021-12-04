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
        trim: true,
        unique: true,
    },
    fname: {
        type: Sequelize.STRING,
        trim: true,
    },
    lname: {
        type: Sequelize.STRING,
        trim: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },

    address: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue("address"));
        },
        set: function (val) {
            return this.setDataValue("address", JSON.stringify(val));
        },
    },
    activityStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
});

module.exports = Customer;
