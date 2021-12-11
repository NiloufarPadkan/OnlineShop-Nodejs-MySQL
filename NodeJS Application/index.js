const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/admins/manage/role");
const adminRoute = require("./routes/admins/manage/admin");
const adminLoginRoute = require("./routes/admins/admin/login");
const adminProfileRoute = require("./routes/admins/admin/profile");
const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./routes/admins/manage/permission");

const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const TagRoute = require("./routes/tag");
const sellerProductRoute = require("./routes/product/sellerRoute");
const userProductRoute = require("./routes/product/userRoute");
const customerRoute = require("./routes/customer/login_register");
const coustemerprofileRoute = require("./routes/customer/profile");
const editCustomerByADminRoute = require("./routes/customer/admin/editCustomerProfile");

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
const Comment = require("./models/Comment");
const Customer = require("./models/Customer");
const Comment_report = require("./models/Comment_report");
const Customer_ProductRating = require("./models/Customer_ProductRating");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Product_views = require("./models/Product_views");
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

app.use(command);
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
app.use(editCustomerByADminRoute);
app.use(adminProfileRoute);

Admin.belongsTo(Role); // Will add rold_id to user
Customer.belongsTo(Role);
Comment.belongsTo(Customer);
Comment.belongsTo(Product);
Comment_report.belongsTo(Comment);
Comment_report.belongsTo(Customer);
Product.belongsTo(Category);
Product.belongsTo(Brand);
Product.belongsTo(Tag);
Product_views.belongsTo(Product);
Product.hasOne(Product_views);
// Product.belongsToMany(Product_views, { through: Product_views });

Permission.belongsToMany(Role, { through: rolePermission });
Role.belongsToMany(Permission, { through: rolePermission });
//Product.belongsToMany(Customer, { through: Product_Rating });
Product.hasMany(Customer_ProductRating);

Customer.belongsToMany(Product, { through: Customer_ProductRating });
Product.belongsToMany(Customer, { through: Customer_ProductRating });

Product.belongsToMany(UserType, { through: TypePrice });

Customer.hasOne(Cart);
Cart.belongsTo(Customer);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(Customer);
Customer.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

Permission.belongsToMany(Role, { through: rolePermission });
Role.belongsToMany(Permission, { through: rolePermission });

Product.belongsToMany(UserType, { through: TypePrice });
// Comment.belongsToMany(Product, { through: Product_comment });
sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log("server is running");
});
