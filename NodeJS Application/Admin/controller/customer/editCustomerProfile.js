const editProfileService = require("../../services/customer/profile");
const Response = require("../../../services/response");
const Can = require("../../../services/can/can").can;

exports.update = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update customer");
    if (!permissionResult) {
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

        response.setStatus(200).setRes(updatedCustomerRes);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
