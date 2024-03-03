/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const express = require('express');
const crypto = require('crypto');
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
const { hashToken, encryptData } = require('@src/utils/hashToken');
const { sendMailRegister } = require('@src/services/mail.services');
const { isAuthenticated } = require('@src/middlewares');
const { setBlackListToken } = require('@src/utils/redis');

const router = express.Router();

router.post('/register', registerValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorRes(res, errors.array(), 400);
        }

        // const payload = { ...req.body };
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

        const token = crypto.randomBytes(32).toString('hex'); // save ke database
        const encryptToken = encryptData(token); // send ke user

        const emailPayload = {
            name: user.name,
            verify_link: `${process.env.BASE_URL}/account/verify?token=${encryptToken}`,
        };
        await sendMailRegister(email, emailPayload);

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

        if (!existingUser.active) {
            res.status(404);
            throw new Error('Please verify your account.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        const data = {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
        successRes(res, data, 200, 'Login successful');
    } catch (err) {
        next(err);
    }
});

router.post('/refresh', async (req, res, next) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            // pass status 403, frontend handle navigate to login page
            res.status(403);
            throw new Error('Invalid Refresh Token');
        }

        const hashedToken = hashToken(refresh_token);
        if (hashedToken !== savedRefreshToken.hashed_token) {
            // pass status 403, frontend handle navigate to login page
            res.status(403);
            throw new Error('Invalid Token');
        }

        const user = await findUserById(payload.id);
        if (!user) {
            // pass status 403, frontend handle navigate to login page
            res.status(403);
            throw new Error('Account not found');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        const data = {
            access_token: accessToken,
            refresh_token: newRefreshToken,
        };
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

router.post('/logout', isAuthenticated, async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const { user } = req;
        // console.log(user);
        // console.log(token);
        // console.log(user.exp);
        await revokeTokens(user.id);

        const token_key = `bl_${token}`;
        await setBlackListToken(token_key, token, user.exp);

        successRes(res, null, 200, 'You have been logged out successfully');
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
        successRes(res, null, 200, `Tokens revoked for user with id #${userId}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
