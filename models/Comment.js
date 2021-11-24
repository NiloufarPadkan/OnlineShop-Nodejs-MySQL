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
        type: Sequelize.TINYINT,
        default: false,
    },
});

module.exports = Comment;
