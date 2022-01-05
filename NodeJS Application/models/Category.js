const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Category = sequelize.define("category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: true,
    },
    title_slug: {
        type: Sequelize.STRING,
    },
    photo: {
        type: Sequelize.STRING,
    },
    parentId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    activityStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        set: function (val) {
            if (val === 1) return this.setDataValue("activityStatus", true);
            else return this.setDataValue("activityStatus", false);
        },
    },
});
function slug(titleStr) {
    titleStr = titleStr.replace(/^\s+|\s+$/g, "");
    titleStr = titleStr.toLowerCase();
    //persian support
    titleStr = titleStr
        .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, "")
        // Collapse whitespace and replace by -
        .replace(/\s+/g, "-")
        // Collapse dashes
        .replace(/-+/g, "-");
    return titleStr;
}

Category.beforeCreate(async (category, options) => {
    category.title_slug = slug(category.title);
});
module.exports = Category;
