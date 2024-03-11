/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { validateCodeWeb } = require('@src/services/verify_email.services');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.get('/ping', (req, res) => res.json('pong'));

router.get('/account/verify', async (req, res, next) => {
    const { token } = req.query;
    let msg = 'Account Verification Successful!';
    try {
        msg = await validateCodeWeb(token);
    } catch (err) {
        next(err);
    }
    res.render('verify_email', { title: 'Account Verification', msg });
});

module.exports = router;
