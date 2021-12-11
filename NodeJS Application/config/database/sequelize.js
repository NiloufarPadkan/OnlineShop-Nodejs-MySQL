const Sequelize = require("sequelize");

const sequelize = new Sequelize("shop", "root", "zaq123??", {
    dialect: "mysql",
    port: "3306",
    host: "localhost",
    charset: "utf8",
    collate: "utf8_persian_ci",
    logging: false,
});

module.exports = sequelize;
