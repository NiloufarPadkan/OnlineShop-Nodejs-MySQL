const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Category = sequelize.define("Category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
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
    parentId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    activityStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        set: function (val) {
            if (val === 1) return this.setDataValue("activityStatus", true);
            else return this.setDataValue("activityStatus", false);
        },
    },
});

module.exports = Category;
