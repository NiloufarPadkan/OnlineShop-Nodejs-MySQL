const editProfileService = require("../../services/customerService/profile");
const Response = require("../../services/response");
const Can = require("../../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.update = async (req, res, next) => {
    let response = new Response();
    let ownsProfile = false;
    if (req.body.customerId === req.customer.id.toString()) ownsProfile = true;

    if (!ownsProfile) {
        response.setStatus(404).setMessage("fail").setRes("notallowed");
        return res.status(404).send(response.handler());
    }

    try {
        const updatedCustomerRes = await editProfileService.updateCustomer(req);
        if (updatedCustomerRes === "customerNotFound") {
            response.setStatus(403).setMessage("fail").setRes("customerNotFound");
            return res.status(404).send(response.handler());
        }

        if (
            updatedCustomerRes === "duplicateEmail" ||
            updatedCustomerRes === "duplicatePhone"
        ) {
            response.setStatus(404).setMessage("fail").setRes(updatedCustomerRes);
            return res.status(404).send(response.handler());
        }

        if (updatedCustomerRes != "") {
            response.setStatus(200).setRes(updatedCustomerRes);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
