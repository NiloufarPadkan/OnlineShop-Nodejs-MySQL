const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");
const Role = require("./Role");

const Admin = sequelize.define("admin", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [6, 30],
        trim: true,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
    phone: {
        type: Sequelize.STRING,
        // allowNull: false,
        trim: true,
        unique: true,
    },

    avtivityStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
    hash: Sequelize.STRING,
    salt: Sequelize.STRING,
});
Admin.belongsTo(Role); // Will add company_uuid to user

module.exports = Admin;
