const express = require("express");
const router = express.Router();
const adminController = require("../../controller/root/admin");

const {
    validationForAdminRegister,
} = require("../../middleware/validations/registerValidation");
const { verifyToken } = require("../../middleware/verification/loginVerify");
const { can } = require("../../middleware/can/can");

router.post(
    "/admin/create",
    verifyToken,
    validationForAdminRegister,
    adminController.store
);

router.get("/admin/list", adminController.index);

router.put("/admin/edit", adminController.update);
router.delete("/admin/delete", verifyToken, adminController.destroy);

module.exports = router;
// stor index update destory  show
