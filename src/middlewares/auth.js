function onlyAdmin(req, res, next) {
    if (req.user.role.name === 'admin') {
        return next();
    }
    res.status(403);
    throw new Error('Un-Authorized');
}

function onlyMember(req, res, next) {
    if (req.user.type === 'member') {
        return next();
    }

    res.status(403);
    throw new Error('Un-Authorized');
}

module.exports = {
    onlyAdmin,
    onlyMember,
};
