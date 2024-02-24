/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { findUserByIdNoPassword } = require('@src/services/users.services');

const router = express.Router();

router.get('/me', async (req, res, next) => {
    try {
        console.log(req.user.id);
        const data = await findUserByIdNoPassword(req.user.id);
        if (data === null) {
            res.status(404);
            throw new Error('Data not found!');
        }
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
