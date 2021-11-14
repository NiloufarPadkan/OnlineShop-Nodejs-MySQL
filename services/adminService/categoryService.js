const Category = require("../../models/Category");

exports.insertCategory = async (req, res, next) => {
    try {
        const category = req.body.title;
        const duplicateCategory = await Category.findOne({
            where: {
                title: category,
            },
        });
        if (duplicateCategory) {
            return "alreadyExists";
        }
        const newCategory = new Category({
            title: category,
        });

        const savedCategory = await newCategory.save();
        console.log(savedCategory);
        return savedCategory;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getcategory = async (req, res, next) => {
    try {
        const limit = req.body.size ? req.body.size : 3;
        const offset = req.body.page ? req.body.page * limit : 0;
        const categories = await Category.findAll({
            limit: limit,
            offset: offset,
        });
        return categories;
    } catch (e) {
        return "";
    }
};
exports.updatecategory = async (req) => {
    try {
        if (!req.body.title) {
            return "titleEmpty";
        }
        const categoryId = req.body.categoryId;
        const foundCategory = await Category.findByPk(categoryId);
        if (!foundCategory) {
            return "categoryNotFound";
        }
        const editedCategory = await Category.findByPk(categoryId).then((category) => {
            category.title = req.body.title;
            return category.save();
        });
        return editedCategory;
    } catch (e) {
        return "";
    }
};
exports.destroyCategory = async (req) => {
    const categoryId = req.body.categoryId;
    try {
        const category = await Category.destroy({
            where: {
                id: categoryId,
            },
        });
        if (category) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
