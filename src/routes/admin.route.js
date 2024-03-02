/* eslint-disable import/no-unresolved */
const express = require('express');
const crypto = require('crypto');
const { successRes } = require('@src/utils/response');
const { findAll } = require('@src/services/users.services');
const { encryptData, decryptData } = require('@src/utils/hashToken');

const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        const user = await findAll(req);
        successRes(res, user);
    } catch (err) {
        next(err);
    }
});

router.get('/common', async (req, res, next) => {
    try {
        const token = crypto.randomBytes(32).toString('hex'); // save di database
        const custToken = encryptData(token); // ke user
        console.log('token: ', token);
        console.log('custToken: ', custToken);
        const decryptToken = decryptData(custToken);
        console.log(decryptToken);
        if (decryptToken !== token) {
            res.status(401);
            throw new Error('Invalid Token');
        }
        successRes(res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
