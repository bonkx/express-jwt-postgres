/* eslint-disable import/no-unresolved */
const db = require('@src/entity/models');
const { hashToken } = require('@src/utils/hashToken');

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    return db.RefreshToken.create({
        id: jti,
        hashed_token: hashToken(refreshToken),
        user_id: userId,
    });
}

function findRefreshTokenById(id) {
    return db.RefreshToken.findOne({
        where: {
            id,
        },
    });
}

function deleteRefreshToken(id) {
    return db.RefreshToken.update({
        revoked: true,
    }, {
        where: {
            id,
        },
    });
}

function revokeTokens(userId) {
    return db.RefreshToken.update({
        revoked: true,
    }, {
        where: {
            user_id: userId,
        },
    });
}

module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens,
};
