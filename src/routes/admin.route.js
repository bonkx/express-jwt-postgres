/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { findAll } = require('@src/services/users.services');

const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        const user = await findAll(req);
        successRes(res, user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
