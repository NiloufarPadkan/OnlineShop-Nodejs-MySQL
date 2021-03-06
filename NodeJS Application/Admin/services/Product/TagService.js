const Tag = require("../../../models/Tag");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
exports.insertTag = async (req, res, next) => {
    try {
        const tag = req.body.title;

        const duplicateTag = await Tag.findOne({
            where: {
                title: tag,
            },
        });
        if (duplicateTag) {
            return "alreadyExists";
        }
        const newTag = new Tag({
            title: tag,
        });

        const savedTag = await newTag.save();
        return savedTag;
    } catch (e) {
        throw new Error(e);
    }
};

exports.gettag = async (req, res, next) => {
    try {
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
        let searchString = req.query.search ? req.query.search : "";

        const tags = await Tag.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            where: {
                title: { [Op.like]: "%" + searchString + "%" },
            },
        });

        return tags;
    } catch (e) {
        throw new Error(e);
    }
};

exports.updatetag = async (req) => {
    try {
        if (!req.body.title) {
            return "titleEmpty";
        }
        const tagId = req.body.tagId;
        const foundTag = await Tag.findByPk(tagId);
        if (!foundTag) {
            return "tagNotFound";
        }
        foundTag.title = req.body.title;
        await foundTag.save();

        return editedTag;
    } catch (e) {
        throw new Error(e);
    }
};

exports.destroyTag = async (req) => {
    const tagId = req.body.tagId;
    try {
        const tag = await Tag.destroy({
            where: {
                id: tagId,
            },
        });
        if (tag) return true;
        else return false;
    } catch (e) {
        return false;
    }
};
