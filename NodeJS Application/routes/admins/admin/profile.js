const express = require("express");
const router = express.Router();
const meController = require("../../../controller/admins/Admin/me");
const editProfileController = require("../../../controller/admins/Admin/editMyProfile");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.put("/admin/editprofile", verifyToken, editProfileController.edit);
router.get("/admin/me", verifyToken, meController.me);

module.exports = router;
