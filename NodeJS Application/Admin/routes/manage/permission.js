const express = require("express");
const router = express.Router();
const permissionController = require("../../controller/manage/permission");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.post("/permission/add", verifyToken, permissionController.store);
router.get("/permission", verifyToken, permissionController.index);

module.exports = router;
// stor index update destory  show
