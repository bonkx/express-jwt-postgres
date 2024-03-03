/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes, paginationRes } = require('@src/utils/response');
const { isAuthenticated } = require('@src/middlewares');
const {
    findAll, getUser, updateUser, deleteUser,
} = require('@src/services/users.services');

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
        const data = await getUser(req);
        if (data === null) {
            res.status(404);
            throw new Error('Data not found!');
        }
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const data = await updateUser(req);
        if (data === null) {
            res.status(404);
            throw new Error('Data not found!');
        }
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await deleteUser(req);
        console.log(data);
        if (data) {
            successRes(res, null, 200, 'Data deleted successfully!');
        }

        res.status(404);
        throw new Error('Data not found!');
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
