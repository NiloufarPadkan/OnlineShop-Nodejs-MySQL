const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../../middleware/verification/customerLoginVerify");
const Can = require("../../../services/can/can");
const Response = require("../../../services/response");

router.get("/customer/chat", verifyToken, async function (req, res, next) {
    try {
        let response = new Response();

        response.setStatus(200).setRes(req.customer);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
});

module.exports = router;
