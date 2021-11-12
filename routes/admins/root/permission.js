const express = require("express");
const router = express.Router();
const permissionController = require("../../../controller/admins/root/permission");
const { verifyToken } = require("../../../middleware/verification/loginVerify");

router.post("/permission/add", verifyToken, permissionController.store);
router.get("/permission/", verifyToken, permissionController.index);

module.exports = router;
// stor index update destory  show
