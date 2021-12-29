const express = require("express");
const router = express.Router();
const meController = require("../../controller/auth//me");
const editProfileController = require("../../controller/auth/editMyProfile");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.put("/admin/editprofile", verifyToken, editProfileController.edit);
router.get("/admin/me", verifyToken, meController.me);

module.exports = router;
