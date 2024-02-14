const express = require('express');
const { isAuthenticated } = require('../middlewares');
const { findAll } = require('../services/users.services');
// const { errData, errorRes, successRes } = require('./response');
const { errData, errorRes, successRes } = require('@common/response');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await findAll();
        successRes(res, user);
    } catch (err) {
        next(err);
    }
});

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const user = await findUserById(userId);
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
