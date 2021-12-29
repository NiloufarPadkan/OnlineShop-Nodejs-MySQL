const Customer = require("../../../models/Customer");
const tokenGenerator = require("../../../lib/jwtUtil").genToken;

exports.login_signup = async (req) => {
    try {
        const customer = await Customer.findOrCreate({
            where: {
                phone: req.body.phone,
                roleId: 3,
            },
        });

        if (customer[0].activityStatus === false) {
            return "yourAcoountIsNotActive";
        }
        const accessToken = tokenGenerator(customer[0].id, customer[0].roleId);
        req.customer = customer;

        return accessToken;
    } catch (e) {
        console.log(e);
        return "";
    }
};
