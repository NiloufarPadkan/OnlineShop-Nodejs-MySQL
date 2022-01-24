const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const Category = require("./Category");
const Brand = require("./Brand");
const Product_views = require("./Product_views");
const Product_tag = require("./Product_tag");
const Customer = require("./Customer");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const UserType = require("./UserType");
const TypePrice = require("./TypePrice");
const Tag = require("./Tag");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Customer_ProductRating = require("./Customer_ProductRating");
const sequelize = require("../config/database/sequelize");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [4, 30],
    },
    name_slug: {
        type: Sequelize.STRING,
    },
    base_price: {
        type: INTEGER,
        allowNull: false,
        trim: true,
    },
    temp_price: {
        type: INTEGER,
        allowNull: false,
        trim: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        set: function (val) {
            if (val < 0) {
                return this.setDataValue("quantity", 0);
            }
            return this.setDataValue("quantity", val);
        },
    },

    description: {
        type: Sequelize.TEXT,
        // allowNull: false,
        trim: true,
    },
    photo: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue("photo"));
        },
        set: function (val) {
            return this.setDataValue("photo", JSON.stringify(val));
        },
    },
    coverThumb: {
        type: Sequelize.STRING,
    },
    smallCover: {
        type: Sequelize.STRING,
    },
    activityStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: function (val) {
            if (val === 1) return this.setDataValue("activityStatus", true);
            else return this.setDataValue("activityStatus", false);
        },
    },
    AvgRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

Product.beforeCreate(async (product, options) => {
    product.name_slug = slug(product.name);
});

Product.belongsTo(Category);
Product.belongsTo(Brand);
Product_views.belongsTo(Product);
Product.hasOne(Product_views);
Product.belongsToMany(Tag, { through: Product_tag });
Tag.belongsToMany(Product, { through: Product_tag });
Customer.belongsToMany(Product, {
    through: Customer_ProductRating,
});
Product.hasMany(Customer_ProductRating);

Product.belongsToMany(Customer, {
    through: Customer_ProductRating,
});

Product.belongsToMany(UserType, {
    through: TypePrice,
});
Product.hasMany(Product_tag);

Product.belongsToMany(Cart, {
    through: CartItem,
});

Cart.belongsToMany(Product, {
    through: CartItem,
});

Order.belongsToMany(
    Product,
    {
        through: OrderItem,
    },
    { onDelete: "NO ACTION", hooks: true }
);

module.exports = Product;
