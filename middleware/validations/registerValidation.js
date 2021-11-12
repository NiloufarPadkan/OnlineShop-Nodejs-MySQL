const validator = require("validator");
const dict = require("../../resources/dict");
const Can = require("../../services/can/can");
const AdminRes = require("../../services/responses/AdminCreated");
const Response = require("../../services/responses/general");

const Admin = require("../../models/Admin");

const validationForAdminRegister = async (req, res, next) => {
    let response = new Response();

    try {
        const can = await Can.can(req.admin.roleId, "add admin");
        if (!can) {
            let response = new AdminRes(403, "fail", "notAllowed");
            return res.status(403).send(response.handler());
        }

        const admin = await Admin.findOne({
            where: { email: req.body.email },
        });
        if (admin) {
            response.setStatus(400).setMessage("fail").setRes(dict.emailExistence);
            return res.status(400).send(response.handler());
        }
        if (!validator.isEmail(req.body.email)) {
            response.setStatus(422).setMessage("fail").setRes(dict.invalidEmail);
            return res.status(400).send(response.handler());
        }

        const existingUser = await Admin.findOne({
            where: { username: req.body.username },
        });
        if (existingUser) {
            response.setStatus(500).setMessage("fail").setRes(dict.userExistence);
            return res.status(400).send(response.handler());
        }

        const existingPhone = await Admin.findOne({
            where: { phone: req.body.phone },
        });
        if (existingPhone) {
            response.setStatus(500).setMessage("fail").setRes(dict.phoneExistence);
            return res.status(400).send(response.handler());
        }

        if (!validator.isAlphanumeric(req.body.username)) {
            response.setStatus(422).setMessage("fail").setRes(dict.AlphanumericError);
            return res.status(422).send(response.handler());
        }

        if (req.body.username.length < 6 || req.body.username.length > 30) {
            response.setStatus(500).setMessage("fail").setRes(dict.lengthError);
            return res.status(400).send(response.handler());
        }
        //strong pass
        if (!validator.isStrongPassword(req.body.password)) {
            response.setStatus(422).setMessage("fail").setRes(dict.weakPass);
            return res.status(400).send(response.handler());
        }

        next();
        //validation of username
    } catch (e) {
        return res.status(422).send({ error: e });
    }
};

module.exports = {
    validationForAdminRegister,
};
