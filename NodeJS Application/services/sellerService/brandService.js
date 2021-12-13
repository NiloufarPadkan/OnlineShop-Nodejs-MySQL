const Brand = require("../../models/Brand");

exports.insertBrand = async (req, res, next) => {
    try {
        const brand = req.body.name;
        const duplicateBrand = await Brand.findOne({
            where: {
                name: brand,
            },
        });
        if (duplicateBrand) {
            return "alreadyExists";
        }
        let photoPath = req.files;
        let path = Object.values(photoPath);

        const newBrand = new Brand({
            name: brand,
            photo: path,
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
        const limit = req.body.size ? req.body.size : 3;
        const offset = req.body.page ? req.body.page * limit : 0;
        const brands = await Brand.findAll({
            limit: limit,
            offset: offset,
        });
        return brands;
    } catch (e) {
        return "";
    }
};
exports.updatebrand = async (req) => {
    try {
        if (!req.body.name) {
            return "nameEmpty";
        }
        const brandId = req.body.brandId;
        const foundBrand = await Brand.findByPk(brandId);
        if (!foundBrand) {
            return "brandNotFound";
        }
        const editedBrand = await Brand.findByPk(brandId).then((brand) => {
            brand.title = req.body.title;
            return brand.save();
        });
        return editedBrand;
    } catch (e) {
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
