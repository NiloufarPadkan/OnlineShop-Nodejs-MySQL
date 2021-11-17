const Tag = require("../../models/Tag");
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
        // console.log(savedTag);
        return savedTag;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.gettag = async (req, res, next) => {
    try {
        const limit = req.body.size ? req.body.size : 3;
        const offset = req.body.page ? req.body.page * limit : 0;
        const tags = await Tag.findAll({
            limit: limit,
            offset: offset,
        });
        return tags;
    } catch (e) {
        return "";
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
        const editedTag = await Tag.findByPk(tagId).then((tag) => {
            tag.title = req.body.title;
            return tag.save();
        });
        return editedTag;
    } catch (e) {
        return "";
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
        console.log(e);
        return false;
    }
};
