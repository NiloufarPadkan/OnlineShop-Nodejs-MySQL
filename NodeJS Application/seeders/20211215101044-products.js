"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("products", [
            {
                activityStatus: true,
                AvgRating: 0,
                name: "دوچرخه المپیا سایز 24",
                name_slug: "دوچرخه-المپیا-سایز-24",

                base_price: "11000000",
                temp_price: "10000000",
                quantity: "2",
                categoryId: "1",
                brandId: "1",
                photo: JSON.stringify([
                    "http://localhost:3001/uploads\\olympia1.jpg",
                    "http://localhost:3001/uploads\\olympia1.jpg",
                ]),

                smallCover: "http://localhost:3001/uploads/small-olympia1.jpg",
                coverThumb: "http://localhost:3001/uploads/thumbnail-olympia1.jpg",
                description:
                    "دوچرخه المپیا سامر با بهره گیری از فلز سبک از بدنه ای سبک و مقاوم نسبت به سایر مدل ها برخوردار است. این دوچرخه کوهستان با قیمتی مناسب و کیفیتی قابل قبول عرضه می شود. تعداد دنده 21 سرعته، رنگ کربن و طوقه 3 سانت دو جداره از محاسن این مدل به شمار می آید",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                activityStatus: true,
                AvgRating: 0,
                name: "دوچرخه کراسس سایز 26",
                name_slug: "دوچرخه-کراسس-سایز-26",

                base_price: "12000000",
                temp_price: "12000000",
                quantity: "3",
                categoryId: "1",
                brandId: "2",
                brandId: "1",
                photo: JSON.stringify(["http://localhost:3001/uploads\\cross-bike.jpg"]),
                smallCover: "http://localhost:3001/uploads/small-cross-bike.jpg",
                coverThumb: "http://localhost:3001/uploads/thumbnail-cross-bike.jpg",
                description:
                    "    ست دنده : شیمانو ترنی تی زد کلاجدار       جنس بدنه: آلومینیوم 6061 سبک     ",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                activityStatus: true,
                AvgRating: 0,
                name: "تلمبه دوچرخه المپیا ",
                name_slug: "تلمبه-دوچرخه-المپیا",

                base_price: "250000",
                temp_price: "250000",
                quantity: "12",
                categoryId: "2",
                brandId: "1",

                description: " جنس بدنه: آلومینیوم ",

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
