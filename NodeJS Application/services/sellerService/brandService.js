const Brand = require("../../models/Brand");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
exports.insertBrand = async (req, res, next) => {
    try {
        const persianName = req.body.PersianName;
        const englishName = req.body.EnglishName ? req.body.EnglishName : "";
        console.log(englishName);
        let photoPath;
        if (req.file) photoPath = process.env.IMAGE_PREFIX + req.file.path;
        else photoPath = "";
        const newBrand = new Brand({
            PersianName: persianName,
            EnglishName: englishName,
            photo: photoPath,
        });

        const savedBrand = await newBrand.save();
        return savedBrand;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.getbrand = async (req, res, next) => {
    try {
        const limit = req.query.size ? req.query.size : 999;
        const offset = req.query.page ? req.query.page * limit : 0;
        let searchString = req.query.search ? req.query.search : "";

        const brands = await Brand.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            where: {
                [Op.or]: [
                    {
                        PersianName: { [Op.like]: "%" + searchString + "%" },
                    },
                    {
                        EnglishName: { [Op.like]: "%" + searchString + "%" },
                    },
                ],
            },
        });
        //console.log(brands);
        return brands;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.updatebrand = async (req) => {
    try {
        const brandId = req.body.brandId;
        const foundBrand = await Brand.findByPk(brandId);
        if (!foundBrand) {
            return "brandNotFound";
        }
        const editedBrand = await Brand.findByPk(brandId).then((brand) => {
            let photoPath;
            const persianName = req.body.PersianName
                ? req.body.PersianName
                : brand.PersianName;
            const englishName = req.body.EnglishName
                ? req.body.EnglishName
                : brand.EnglishName;

            if (req.file) photoPath = process.env.IMAGE_PREFIX + req.file.path;
            else photoPath = brand.photo;

            brand.PersianName = persianName;
            brand.EnglishName = englishName;
            brand.photo = photoPath;
            return brand.save();
        });
        return editedBrand;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.destroyBrand = async (req) => {
    const brandId = req.body.brandId;
    try {
        const brand = await Brand.destroy({
            where: {
                id: brandId,
            },
        });
        if (brand) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
