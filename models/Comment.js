const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

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

module.exports = Comment;
