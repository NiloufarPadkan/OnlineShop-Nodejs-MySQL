const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const logger = require("./logger/logger");
var nodemailer = require("nodemailer");

const sequelize = require("./config/database/sequelize");
const roleRoute = require("./Admin/routes/manage/role");
const adminRoute = require("./Admin/routes/manage/admin");
const adminLoginRoute = require("./Admin/routes/auth/login");
const adminProfileRoute = require("./Admin/routes/auth/profile");
const adminCartRouter = require("./Admin/routes/cart/cartRouter");
const logRouter = require("./Admin/routes/log.js/logRoute");
const adminChatRouter = require("./Admin/routes/chat/chatRouter");
const customerChatRouter = require("./Customer/routes/chat/chatRouter");
const permissionRoute = require("./Admin/routes/manage/permission");

const categoryRoute = require("./Admin/routes/product/category");
const brandRoute = require("./Admin/routes/product/brand");
const TagRoute = require("./Admin/routes/product/tag");
const sellerProductRoute = require("./Admin/routes/product/sellerRoute");
const userProductRoute = require("./Customer/routes/product/userRoute");
const customerRoute = require("./Customer/routes/auth/login_register");
const customerOrderRoute = require("./Customer/routes/order/orderRouter");
const adminOrderRoute = require("./Admin/routes/order/orderRouter");
const coustemerprofileRoute = require("./Customer/routes/auth/profile");
const editCustomerByAdminRoute = require("./Admin/routes/customer/editCustomerProfile");
const cartRoute = require("./Customer/routes/cart/cartRouter");
const checkCartRouter = require("./Admin/routes/cart/checkCart");

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

app.use(customerOrderRoute);
app.use(adminOrderRoute);

app.use(adminChatRouter);
app.use(customerChatRouter);

app.use((error, req, res, next) => {
    logger.error({
        level: "error",
        message: error,
        //   label: "",
    });

    const status = error.statusCode || 500;
    const message = "something failed";
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log("server is running");
});
