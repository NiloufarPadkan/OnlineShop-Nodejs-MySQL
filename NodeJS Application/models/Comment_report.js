const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");
const Comment = require("./Comment");
const Customer = require("./Customer");
const Comment_report = sequelize.define("Comment_report", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    read_receipt: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: function (val) {
            if (val === 1) return this.setDataValue("read_receipt", true);
            else return this.setDataValue("read_receipt", false);
        },
    },
});

Comment_report.belongsTo(Comment);
Comment_report.belongsTo(Customer);
module.exports = Comment_report;
