/* eslint-disable import/no-unresolved */
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();
const { hashToken } = require('@src/utils/hashToken');

const { RefreshToken = db.refresh_tokens } = db;

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    return RefreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId,
        },
    });
}

function findRefreshTokenById(id) {
    return RefreshToken.findUnique({
        where: {
            id,
        },
    });
}

function deleteRefreshToken(id) {
    return RefreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true,
        },
    });
}

function revokeTokens(userId) {
    return RefreshToken.updateMany({
        where: {
            userId,
        },
        data: {
            revoked: true,
        },
    });
}

module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens,
};
