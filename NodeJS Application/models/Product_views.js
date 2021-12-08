const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product_views = sequelize.define("Product_views", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    IpList: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue("IpList"));
        },
        set: function (val) {
            return this.setDataValue("IpList", JSON.stringify(val));
        },
    },
    viewCount: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Product_views;
