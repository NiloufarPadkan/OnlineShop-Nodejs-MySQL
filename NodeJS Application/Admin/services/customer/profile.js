//edit profile
const Customer = require("../../../models/Customer");

exports.updateCustomer = async (req) => {
    try {
        //index 0 of address is main address
        const customerId = req.params.id;

        const foundCustomer = await Customer.findByPk(customerId);
        if (!foundCustomer) {
            return "customernotfound";
        }
        const duplicateEmail = await Customer.findOne({
            where: {
                email: req.body.email ? req.body.email : "",
            },
        });
        if (duplicateEmail && duplicateEmail.id !== foundCustomer.id) {
            return "duplicateEmail";
        }
        const duplicatephone = await Customer.findOne({
            where: {
                phone: req.body.phone ? req.body.phone : "",
            },
        });
        if (duplicatephone && duplicatephone.id !== foundCustomer.id) {
            return "duplicatePhone";
        }
        const addressArray = req.body.address ? req.body.address : foundCustomer.address;

        const email = req.body.email ? req.body.email : foundCustomer.email;
        const phone = req.body.phone ? req.body.phone : foundCustomer.phone;
        const fname = req.body.fname ? req.body.fname : foundCustomer.fname;
        const lname = req.body.lname ? req.body.lname : foundCustomer.lname;

        foundCustomer.email = email;
        foundCustomer.phone = phone;
        foundCustomer.fname = fname;
        foundCustomer.lname = lname;
        foundCustomer.address = addressArray;
        await foundCustomer.save();

        return foundCustomer;
    } catch (e) {
        throw new Error(e);
    }
};
