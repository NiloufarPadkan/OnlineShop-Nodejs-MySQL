const express = require("express");
const router = express.Router();
const yargs = require("yargs");
const Admin = require("../../../models/Admin");
const genPassword = require("../../../lib/passwordUtil").genPassword;

yargs.command({
    command: "addRoot",
    describe: "add a new root",
    builder: {
        username: { demandOption: true },
        password: { type: String, demandOption: true },
        email: { demandOption: true },
        phone: { demandOption: true },
        avtivityStatus: {},
    },

    handler: async function (argv) {
        if (argv.avtivityStatus == "") {
            argv.avtivityStatus = false;
        }
        const saltHash = genPassword(toString(argv.password));
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newAdmin = new Admin({
            username: argv.username,
            email: argv.email,
            phone: argv.phone,
            avtivityStatus: argv.avtivityStatus,
            hash: hash,
            salt: salt,
        });
        try {
            const savedAdmin = await newAdmin.save();
            console.log("root created");
        } catch (e) {
            console.log(e);
        }
    },
});
yargs.parse(); // To set above changes

module.exports = router;
