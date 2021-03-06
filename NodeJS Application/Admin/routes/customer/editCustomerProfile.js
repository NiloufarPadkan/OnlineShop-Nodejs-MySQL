const express = require("express");
const router = express.Router();
const editProfileController = require("../../controller/customer/editCustomerProfile");

const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.put("/admin/editCustomer/:id", verifyToken, editProfileController.update);

module.exports = router;
