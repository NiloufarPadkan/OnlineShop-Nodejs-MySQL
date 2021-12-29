const credentialServiece = require("../../services/auth/updateCredentials");
const Response = require("../../../services/responses/general");
exports.update = async (req, res, next) => {
    let response = new Response();

    try {
        const updateCredentialResponse = await credentialServiece.updateCredential(req);

        if (updateCredentialResponse === "adminNotFound") {
            response.setStatus(404).setMessage("fail").setRes("adminNotFound");
            res.status(400).send(response.handler());
        } else if (updateCredentialResponse === "weakPass") {
            response.setStatus(404).setMessage("fail").setRes("weakPass");
            res.status(400).send(response.handler());
        } else {
            response.setStatus(200).setRes(updateCredentialResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
