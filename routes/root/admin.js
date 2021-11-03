const express = require("express");
const router = express.Router();
const adminController = require("../../controller/root/admin");
const adminService = require("../../services/admin");

const {
    validationForAdminRegister,
} = require("../../middleware/validations/registerValidation");
const { verifyToken } = require("../../middleware/verification/loginVerify");
router.post(
    "/admin/create",
    validationForAdminRegister,
    adminService.insertAdmin,
    adminController.store
);
router.put("/admin/edit", adminService.updateAdmin, adminController.update);
router.delete(
    "/admin/delete",
    verifyToken,
    adminService.destroyAdmin,
    adminController.destroy
);
router.get("/admin/list", adminService.indexAdmins, adminController.index);

module.exports = router;
// stor index update destory  show
