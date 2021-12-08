"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("admins", [
            {
                username: "NiloufarPadkan",
                email: "niloufarpadkan@gmail.com",
                phone: "09915106340",
                activityStatus: 1,
                hash: "0ca53992c04d39f0213db39a82ce3dc6b39ad0db2ba85950b0f994eedc359405fa4611c260cb86b058bc24a385b7ad47da7753db565a76da63ee25327cda86af",
                salt: "518d274ae92d9a00571f55406c774147cb5d10c6a24c50bf31e0ca39d5367821",
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "NegarPadkan",
                email: "negarpadkan@gmail.com",
                phone: "09116985490",
                activityStatus: 1,
                hash: "0ca53992c04d39f0213db39a82ce3dc6b39ad0db2ba85950b0f994eedc359405fa4611c260cb86b058bc24a385b7ad47da7753db565a76da63ee25327cda86af",
                salt: "518d274ae92d9a00571f55406c774147cb5d10c6a24c50bf31e0ca39d5367821",
                roleId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "Amir",
                email: "am@am.am",
                phone: "09356451477",
                activityStatus: 1,
                hash: "cc2d46f55e6e2364d84761cd3bd238136cf8803ef5c98f2125e09991f660020913cd11d44d207c51d18307a26f016413d082db05ef57122da38ae2a6875306d6",
                salt: "cef89a8ea6f6445b8e824a399200be501d1034cf35c19913075336692bbb9ae9",
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "mehrshad",
                email: "mehrshad.shafaghi@gmail.com",
                phone: "09391306878",
                activityStatus: 1,
                hash: "e2128770750c5b6f2f22b000d993df605b88d18365e886ead59b4b9263089eb89f645e44b8a1a76d2e3b1acf811e2f38a8c13c10b8be33ce48a4fb4b6ec0a8f8",
                salt: "34af3365029c949e393e8ea76caff302d8313843f820f31ce16eb49d677af498",
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
