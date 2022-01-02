const Response = require("../../../services/responses/general");
const editProfileService = require("../../services/auth/editProfile");

exports.edit = async (req, res, next) => {
    let response = new Response();

    try {
        const updatedAdminResponse = await editProfileService.editProfile(req);

        if (
            updatedAdminResponse === "duplicateUsername" ||
            updatedAdminResponse === "duplicateEmail" ||
            updatedAdminResponse === "duplicatePhone" ||
            updatedAdminResponse === "adminNotFound"
        ) {
            response.setStatus(404).setMessage("fail").setRes(updatedAdminResponse);
            return res.status(404).send(response.handler());
        }

        response.setStatus(200).setRes(updatedAdminResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
