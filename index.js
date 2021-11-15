const express = require("express");
const dotenv = require("dotenv");
const redis = require("redis");

const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/admins/root/role");
const adminRoute = require("./routes/admins/root/admin");
const adminLoginRoute = require("./routes/admins/admin/login");
const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./routes/admins/root/permission");
const categoryRoute = require("./routes/admins/category");
const brandRoute = require("./routes/admins/brand");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const rolePermission = require("./models/role-permission");
const Admin = require("./models/Admin");

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
Admin.belongsTo(Role); // Will add rold_id to user
Permission.belongsToMany(Role, { through: rolePermission });
//Role.belongsToMany(Permission, { through: rolePermission });
sequelize.sync({});
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.setex("username", 3600, "123");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running");
});
