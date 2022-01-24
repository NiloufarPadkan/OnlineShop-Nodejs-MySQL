const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");
const Permission = require("./Permission");
const rolePermission = require("./role-permission");
const Role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        set: function (val) {
            if (val === 1) return this.setDataValue("status", true);
            else return this.setDataValue("status", false);
        },
    },
});

Permission.belongsToMany(Role, {
    through: rolePermission,
});

Role.belongsToMany(Permission, { through: rolePermission });
module.exports = Role;
