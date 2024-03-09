/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes, errorRes } = require('@src/utils/response');
const { findUserByIdNoPassword, updateProfile, uploadPhotoProfile } = require('@src/services/users.services');
const { validationResult } = require('express-validator');
const { updateUserValidator } = require('@src/middlewares/validators');

const router = express.Router();

router.get('/me', async (req, res, next) => {
    try {
        console.log('====== req user: ', req.user);
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

router.put('/update', updateUserValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorRes(res, errors.array(), 400);
        }

        let data = await updateProfile(req);
        if (data === null) {
            res.status(404);
            throw new Error('Data not found!');
        }

        data = await uploadPhotoProfile(req, res, req.user.id);

        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

router.post('/photo', async (req, res, next) => {
    try {
        const data = await uploadPhotoProfile(req, res, req.user.id);

        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
