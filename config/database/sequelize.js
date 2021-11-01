const Sequelize = require("sequelize");

const sequelize = new Sequelize("shop", "root", "zaq123??", {
    dialect: "mysql",
    port: "3306",
    host: "localhost",
    logging: false,
});

module.exports = sequelize;
