const rolePermissionService = require("../../services/role-permission");
const Response = require("../../services/responses/general");

exports.store = async (req, res, next) => {
    let response = new Response();

    try {
        const assignPermissionResponse =
            await rolePermissionService.AssignPermission(req);

        if (assignPermissionResponse === "alreadyExists") {
            response
                .setStatus(400)
                .setMessage("fail")
                .setRes("alreadyExists");
            return res.status(400).send(response.handler());
        } else if (assignPermissionResponse != "") {
            let response = new Response(
                200,
                "success",
                assignPermissionResponse
            );
            res.status(200).send(response.handler());
        } else {
            //if role or permission doesnt exsist
            response
                .setStatus(400)
                .setMessage("fail")
                .setRes("failed");
            res.status(400).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
