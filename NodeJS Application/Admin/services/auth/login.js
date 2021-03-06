const Admin = require("../../../models/Admin");
const dict = require("../../../resources/dict");
const validPassword = require("../../../lib/passwordUtil").validPassword;
const tokenGenerator = require("../../../lib/jwtUtil").genToken;
const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

exports.loginAdmin = async (req) => {
    try {
        const admin = await Admin.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!admin) return "adminNotFound";
        if (admin.activityStatus === 0) {
            return "yourAcoountIsNotActive";
        }
        const passwordValidation = validPassword(
            req.body.password,
            admin.hash,
            admin.salt
        );
        if (!passwordValidation) return "invalidPassword";
        const accessToken = tokenGenerator(admin.id, admin.roleId);
        req.admin = admin;
        client.flushdb(function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });
        return accessToken;
    } catch (e) {
        throw new Error(e);
    }
};
