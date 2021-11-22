const Customer = require("../../models/Customer");
const tokenGenerator = require("../../lib/jwtUtil").genToken;

exports.login_signup = async (req) => {
    try {
        const customer = await Customer.findOrCreate({
            where: {
                phone: req.body.phone,
            },
        });
        const accessToken = tokenGenerator(customer[0].id);
        req.customer = customer;

        return accessToken;
    } catch (e) {
        return "";
    }
};
