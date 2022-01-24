const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");
const Customer = require("./Customer");
const Product = require("./Product");
const Comment = sequelize.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: function (val) {
            if (val === 1) return this.setDataValue("visible", true);
            else return this.setDataValue("visible", false);
        },
    },
});
Comment.belongsTo(Customer);
Comment.belongsTo(Product);

module.exports = Comment;
