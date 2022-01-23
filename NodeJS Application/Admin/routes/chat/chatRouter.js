const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");
const Can = require("../../../services/can/can");
const Response = require("../../../services/response");

canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

router.get("/admin/chat", verifyToken, async function (req, res, next) {
    try {
        let response = new Response();
        let permissionResult = false;
        if (req.admin)
            permissionResult = await this.canAdmin(
                req.admin.roleId,
                "chat with Customer"
            );
        if (!permissionResult) {
            response.setStatus(404).setMessage("fail").setRes("notallowed");
            return res.status(404).send(response.handler());
        }

        response.setStatus(200).setRes(req.admin);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
});

module.exports = router;
