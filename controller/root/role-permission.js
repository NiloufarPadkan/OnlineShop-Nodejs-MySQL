exports.store = async (req, res, next) => {
    try {
        res.status(200).send(res.locals.permissionAssignResult);
    } catch (e) {
        res.status(500).send(e);
    }
};
