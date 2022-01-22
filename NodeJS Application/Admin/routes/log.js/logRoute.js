const express = require("express");
const router = express.Router();
const logController = require("../../controller/log/logController");
const {
    validationForAdminRegister,
} = require("../../../middleware/validations/adminRegisterValidation");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.get("/log", verifyToken, logController.index);

module.exports = router;
// stor index update destory  show
