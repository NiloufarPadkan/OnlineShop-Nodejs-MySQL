const Response = require("../../../services/responses/general");
const editProfileService = require("../../../services/rootService/editProfile");

exports.edit = async (req, res, next) => {
    let response = new Response();
    let ownsProfile = false;
    // if (req.admin) if (req.body.id === req.admin.id.toString()) ownsProfile = true;

    // if (!ownsProfile) {
    //     response.setStatus(404).setMessage("fail").setRes("notallowed");
    //     return res.status(404).send(response.handler());
    // }

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

        if (updatedAdminResponse != "") {
            response.setStatus(200).setRes(updatedAdminResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
