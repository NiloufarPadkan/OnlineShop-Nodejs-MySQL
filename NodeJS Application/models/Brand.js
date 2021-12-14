const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Brand = sequelize.define("brand", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    PersianName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
    },
    EnglishName: {
        type: Sequelize.STRING,
        allowNull: false,
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
});

module.exports = Brand;
