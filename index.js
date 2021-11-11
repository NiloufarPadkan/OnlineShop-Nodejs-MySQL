const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/admins/root/role");
const adminRoute = require("./routes/admins/root/admin");
const adminLoginRoute = require("./routes/admins/admin/login");
const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./routes/admins/root/permission");

const Role = require("./models/Role");
const Permission = require("./models/Permission");
const rolePermission = require("./models/role-permission");
const Admin = require("./models/Admin");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(command);
app.use(roleRoute);
app.use(adminRoute);
app.use(permissionRoute);
app.use(adminLoginRoute);
Admin.belongsTo(Role); // Will add rold_id to user
Permission.belongsToMany(Role, { through: rolePermission });
//Role.belongsToMany(Permission, { through: rolePermission });
sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running");
});
