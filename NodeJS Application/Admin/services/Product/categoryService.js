//const Category = require("../../models/Category");
const Sequelize = require("sequelize");
const Category = require("../../../models/Category");
const Op = Sequelize.Op;

exports.insertCategory = async (req, res, next) => {
    try {
        const category = req.body.title;
        const parentId = req.body.parentId ? parseInt(req.body.parentId) : null;
        const activityStatus = req.body.activityStatus
            ? parseInt(req.body.activityStatus)
            : 1;

        if (req.body.parentId) {
            const parent = await Category.findByPk(parentId);
            if (!parent) return "parentNotFound";
        }
        const duplicateCategory = await Category.findOne({
            where: {
                title: category,
            },
        });
        console.log(duplicateCategory + "ssssssss");
        if (duplicateCategory) {
            return "alreadyExists";
        }
        let photoPath;
        if (req.file) photoPath = process.env.IMAGE_PREFIX + req.file.path;
        else photoPath = "";
        const newCategory = new Category({
            title: category,
            parentId: parentId,
            photo: photoPath,
            activityStatus: activityStatus,
        });

        const savedCategory = await newCategory.save();
        return savedCategory;
    } catch (e) {
        console.log(e);
        throw new Error("something failed");
    }
};

function list_to_tree(list) {
    var map = {},
        node,
        roots = [];
    let i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

exports.getcategory = async (req, res, next) => {
    try {
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
        let searchString = req.query.search ? req.query.search : "";

        const categories = await Category.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            raw: true,
            where: {
                title: { [Op.like]: "%" + searchString + "%" },
            },
        });
        return list_to_tree(categories);
    } catch (e) {
        console.log(e);
        throw new Error("something failed");
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
        let photoPath;
        if (req.file) photoPath = process.env.IMAGE_PREFIX + req.file.path;
        else photoPath = foundCategory.photo;

        let activityStatus = req.body.activityStatus
            ? +req.body.activityStatus
            : +foundCategory.activityStatus;

        const editedCategory = await Category.findByPk(categoryId).then((category) => {
            category.title = req.body.title;
            category.photo = photoPath;
            if (req.body.parentId) category.parentId = parseInt(req.body.parentId);
            category.activityStatus = activityStatus;

            return category.save();
        });
        return editedCategory;
    } catch (e) {
        throw new Error("something failed");
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
