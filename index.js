const express = require("express");
const dotenv = require("dotenv");

const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/admins/root/role");
const adminRoute = require("./routes/admins/root/admin");
const adminLoginRoute = require("./routes/admins/admin/login");
const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./routes/admins/root/permission");
const categoryRoute = require("./routes/admins/category");
const brandRoute = require("./routes/admins/brand");
const productRoute = require("./routes/product/sellerRoute");

const Role = require("./models/Role");
const Permission = require("./models/Permission");
const rolePermission = require("./models/role-permission");
const Admin = require("./models/Admin");
const TypePrice = require("./models/TypePrice");
const UserType = require("./models/UserType");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Brand = require("./models/Brand");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, token");
    next();
});
app.use(command);
app.use(roleRoute);
app.use(adminRoute);
app.use(permissionRoute);
app.use(adminLoginRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(productRoute);
Admin.belongsTo(Role); // Will add rold_id to user
Product.belongsTo(Category);
Product.belongsTo(Brand);

Permission.belongsToMany(Role, { through: rolePermission });
Product.belongsToMany(UserType, { through: TypePrice });
//Role.belongsToMany(Permission, { through: rolePermission });
sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0");

// PRODUCT HAS MANY CATEGPRY/TAGS

// CATEGPRY/TAGS HAS MANY PRODUCTS

// USER HAS ONE TYPE
// TYPE HAS MANY USER

// todo :
// magic of
// array of obj
// upload photo
