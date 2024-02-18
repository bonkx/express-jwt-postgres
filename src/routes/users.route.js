/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes, paginationRes } = require('@src/utils/response');
const { isAuthenticated } = require('@src/middlewares');
const { findAll, getUser, updateUser } = require('@src/services/users.services');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await findAll(req);
        paginationRes(res, data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUser(req);
        if (user === null) {
            res.status(404);
            throw new Error('Data Not found!');
        }
        successRes(res, user);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req);
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
