const { Permission } = require("accesscontrol");
const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const rolePermission = sequelize.define("rolePermission", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = rolePermission;
