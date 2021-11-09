const permissionService = require("../../services/permission");
const Response = require("../../services/responses/general");

exports.store = async (req, res, next) => {
    let response = new Response();

    try {
        const insertPermissionResponse =
            await permissionService.insertPermission(req);

        if (insertPermissionResponse === "alreadyExists") {
            response
                .setStatus(400)
                .setMessage("fail")
                .setRes("alreadyExists");
            return res.status(400).send(response.handler());
        } else {
            response.setStatus(200).setRes(insertPermissionResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
// read permissions
//read roles
//read role permissions
