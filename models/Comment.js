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
    status: {
        type: Sequelize.TINYINT,
    },
});

module.exports = Comment;
