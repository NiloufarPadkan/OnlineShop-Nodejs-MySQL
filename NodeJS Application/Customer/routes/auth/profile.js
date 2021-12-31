const express = require("express");
const router = express.Router();
const editProfileController = require("../../controller/auth/editProfile");
const { verifyToken } = require("../../../middleware/verification/customerLoginVerify");

router.put("/customer/edit", verifyToken, editProfileController.update);
module.exports = router;
// stor index update destory  show
