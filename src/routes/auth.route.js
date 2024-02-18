/* eslint-disable import/no-unresolved */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { loginValidator, registerValidator } = require('@src/middlewares/validators');
const {
    findUserByEmail, createUser, findUserById, findUserByUsername,
} = require('@src/services/users.services');
const {
    addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens,
} = require('@src/services/auth.services');
const { successRes, errorRes } = require('@src/utils/response');
const { generateTokens } = require('@src/utils/jwt');
const { hashToken } = require('@src/utils/hashToken');

const router = express.Router();

router.post('/register', registerValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorRes(res, errors.array(), 400);
        }

        const { email, username } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400);
            throw new Error('Email already in use. Please choose another.');
        }

        const existingUsername = await findUserByUsername(username);
        if (existingUsername) {
            res.status(400);
            throw new Error('Username already in use. Please choose another.');
        }

        const user = await createUser(req);

        successRes(res, user, 200, 'Registration has been successfully processed');
    } catch (err) {
        next(err);
    }
});

router.post('/login', loginValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorRes(res, errors.array(), 400);
        }

        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            res.status(404);
            throw new Error('Account not found.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        // const jti = uuidv4();
        // const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        // await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        // res.json({
        //     accessToken,
        //     refreshToken,
        // });
        successRes(res);
    } catch (err) {
        next(err);
    }
});

router.post('/refreshToken', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        next(err);
    }
});

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post('/revokeRefreshTokens', async (req, res, next) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
