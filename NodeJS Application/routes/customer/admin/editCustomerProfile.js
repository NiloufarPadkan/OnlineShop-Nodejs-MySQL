const express = require("express");
const router = express.Router();
const editProfileController = require("../../../controller/customer/admin/editCustomerProfile");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.put("/admin/editcustomer", verifyToken, editProfileController.update);

module.exports = router;
// stor index update destory  show
