const roleService = require("../../services/role");
const Response = require("../../services/responses/general");
exports.store = async (req, res, next) => {
    let response = new Response();

    try {
        const insertRoleResponse = await roleService.insertRole(req);

        if (insertRoleResponse === "alreadyExists") {
            response
                .setStatus(400)
                .setMessage("fail")
                .setRes("alreadyExists");

            res.status(400).send(response.handler());
        } else {
            response.setStatus(200).setRes(insertRoleResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
