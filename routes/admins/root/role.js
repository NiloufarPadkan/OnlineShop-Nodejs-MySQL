const express = require("express");
const router = express.Router();
const rolePermissionController = require("../../../controller/admins/root/role-permission");
const roleController = require("../../../controller/admins/root/role");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.post("/role", verifyToken, roleController.store);

router.post("/role/addPermissiion", verifyToken, rolePermissionController.store);
router.get("/role", verifyToken, roleController.index);
router.put("/role/:id", verifyToken, roleController.update);

module.exports = router;
// stor index update destory  show
