const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/Admin/role");
const adminRoute = require("./routes/Admin/admin");
const yargs = require("yargs");
const command = require("./routes/commands/createRoot");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(command);
app.use(roleRoute);
app.use(adminRoute);
sequelize.sync({});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("app is running");
});
