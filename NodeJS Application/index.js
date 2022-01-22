const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const logger = require("./logger/logger");
const sequelize = require("./config/database/sequelize");
const roleRoute = require("./Admin/routes/manage/role");
const adminRoute = require("./Admin/routes/manage/admin");
const adminLoginRoute = require("./Admin/routes/auth/login");
const adminProfileRoute = require("./Admin/routes/auth/profile");
const adminCartRouter = require("./Admin/routes/cart/cartRouter");
const logRouter = require("./Admin/routes/log.js/logRoute");
//const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./Admin/routes/manage/permission");

const categoryRoute = require("./Admin/routes/product/category");
const brandRoute = require("./Admin/routes/product/brand");
const TagRoute = require("./Admin/routes/product/tag");
const sellerProductRoute = require("./Admin/routes/product/sellerRoute");
const userProductRoute = require("./Customer/routes/product/userRoute");
const customerRoute = require("./Customer/routes/auth/login_register");

const coustemerprofileRoute = require("./Customer/routes/auth/profile");
const editCustomerByAdminRoute = require("./Admin/routes/customer/editCustomerProfile");
const cartRoute = require("./Customer/routes/cart/cartRouter");
const checkCartRouter = require("./Admin/routes/cart/checkCart");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const rolePermission = require("./models/role-permission");
const Admin = require("./models/Admin");
const TypePrice = require("./models/TypePrice");
const UserType = require("./models/UserType");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Brand = require("./models/Brand");
const Tag = require("./models/Tag");
const Product_tag = require("./models/Product_tag");
const Comment = require("./models/Comment");
const Customer = require("./models/Customer");
const Comment_report = require("./models/Comment_report");
const Customer_ProductRating = require("./models/Customer_ProductRating");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Product_views = require("./models/Product_views");
// const bodyparser = require("body-parser");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyparser.json({}));
// app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// const loginLimiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 3,
//     // message: "Too many accounts created from this IP, please try again after 15 minutes",
// });
// const generalLimit = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 10,
//     // message: "Too many accounts created from this IP, please try again after 15 minutes",
// });
// app.use("/admin/login/", loginLimiter);
// app.use(generalLimit);

app.use("/uploads", express.static("uploads"));

// app.use(command);
app.use(logRouter);
app.use(roleRoute);
app.use(adminRoute);
app.use(permissionRoute);
app.use(adminLoginRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(sellerProductRoute);
app.use(userProductRoute);
app.use(TagRoute);
app.use(customerRoute);
app.use(coustemerprofileRoute);
app.use(editCustomerByAdminRoute);
app.use(adminProfileRoute);
app.use(cartRoute);
app.use(checkCartRouter);
app.use(adminCartRouter);

app.use((error, req, res, next) => {
    logger.error({
        level: "error",
        message: error,
        //   label: "ssss",
    });

    const status = error.statusCode || 500;
    const message = "something failed";
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

Admin.belongsTo(Role); // Will add rold_id to user
Customer.belongsTo(Role);

Comment.belongsTo(Customer);
Comment.belongsTo(Product);

Product.belongsTo(Category);
Product.belongsTo(Brand);
Product_views.belongsTo(Product);
Product.hasOne(Product_views);

Product.belongsToMany(Tag, { through: Product_tag });
Tag.belongsToMany(Product, { through: Product_tag });
Product.hasMany(Product_tag);

Product.hasMany(Customer_ProductRating);

Customer.belongsToMany(Product, {
    through: Customer_ProductRating,
});
Product.belongsToMany(Customer, {
    through: Customer_ProductRating,
});

Product.belongsToMany(UserType, {
    through: TypePrice,
});

Customer.hasOne(Cart);
Cart.belongsTo(Customer);
Cart.belongsToMany(Product, {
    through: CartItem,
});
Product.belongsToMany(Cart, {
    through: CartItem,
});
Order.belongsTo(Customer);
Customer.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem,
});

Permission.belongsToMany(Role, {
    through: rolePermission,
});

Role.belongsToMany(Permission, { through: rolePermission });

Comment_report.belongsTo(Comment);
Comment_report.belongsTo(Customer);
Product.belongsToMany(UserType, {
    through: TypePrice,
});
// Comment.belongsToMany(Product, { through: Product_comment });
sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log("server is running");
});
