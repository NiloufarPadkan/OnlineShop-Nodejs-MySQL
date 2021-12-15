const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [4, 30],
    },
    base_price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        trim: true,
    },
    temp_price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        trim: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        // allowNull: false,
        trim: true,
    },
    photo: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue("photo"));
        },
        set: function (val) {
            return this.setDataValue("photo", JSON.stringify(val));
        },
    },
    activityStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: function (val) {
            if (val === 1) return this.setDataValue("activityStatus", true);
            else return this.setDataValue("activityStatus", false);
        },
    },
    AvgRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Product;
