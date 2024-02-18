/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { isAuthenticated } = require('@src/middlewares');
const { findAll } = require('@src/services/users.services');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await findAll(req);
        successRes(res, user);
    } catch (err) {
        next(err);
    }
});

router.get('/me', isAuthenticated, async (req, res, next) => {
    try {
        successRes(res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
