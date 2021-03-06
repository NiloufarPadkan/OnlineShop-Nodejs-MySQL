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
        throw new Error(e);
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

async function updateList(list, parentId, status) {
    var map = {},
        node,
        roots = [];
    let i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i;
        list[i].children = [];
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== null) {
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    let childrens = [];
    if (list[parentId - 1].children) {
        x(list[parentId - 1].children);
    }
    function x(list) {
        list.forEach((element) => {
            childrens.push(element.id);
            if (element.children) {
                x(element.children);
            }
        });
    }
    try {
        let y = await Category.update(
            {
                activityStatus: +status,
            },
            {
                where: { id: { [Op.in]: childrens } },
            }
        );
    } catch (e) {
        console.log(e);
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
        throw new Error(e);
    }
};

exports.updatecategory = async (req) => {
    try {
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

        foundCategory.title = req.body.title;
        foundCategory.photo = photoPath;
        foundCategory.activityStatus = activityStatus;

        if (req.body.parentId) foundCategory.parentId = parseInt(req.body.parentId);

        await foundCategory.save();

        const categories = await Category.findAll({ raw: true });
        updateList(categories, categoryId, activityStatus);
        return foundCategory;
    } catch (e) {
        throw new Error(e);
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
        return false;
    }
};
