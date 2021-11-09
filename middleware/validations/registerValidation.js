const validator = require("validator");
const dict = require("../../resources/dict");
const Can = require("../../services/can/can");
const AdminRes = require("../../services/responses/AdminCreated");

const Admin = require("../../models/Admin");

const validationForAdminRegister = async (req, res, next) => {
    try {
        const can = await Can.can(req.admin.roleId, "add admin");
        if (!can) {
            let response = new AdminRes(403, "fail", "notAllowed");
            return res.status(403).send(response.handler());
        }

        const admin = await Admin.findOne({
            where: { email: req.body.email },
        });
        if (admin) return res.status(500).send({ error: dict.emailExistence });

        if (!validator.isEmail(req.body.email)) {
            return res.status(422).send({ error: dict.invalidEmail });
        }

        const existingUser = await Admin.findOne({
            where: { username: req.body.username },
        });
        if (existingUser)
            return res.status(500).send({ error: dict.userExistence });

        const existingPhone = await Admin.findOne({
            where: { phone: req.body.phone },
        });
        if (existingPhone)
            return res.status(500).send({ error: dict.phoneExistence });
        if (!validator.isAlphanumeric(req.body.username)) {
            return res.status(422).send(dict.AlphanumericError);
        }

        if (req.body.username.length < 6 || req.body.username.length > 30)
            return res.status(422).send(dict.lengthError);

        //strong pass
        if (!validator.isStrongPassword(req.body.password)) {
            return res.status(422).send(dict.weakPass);
        }

        //check if phone number valid

        next();
        //validation of username
    } catch (e) {
        return res.status(422).send({ error: e });
    }
};

module.exports = {
    validationForAdminRegister,
};
