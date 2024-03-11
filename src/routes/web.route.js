/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const crypto = require('crypto');
const { validateCodeWeb, createVerifyCode } = require('@src/services/verify_email.services');
const { findUserByEmail } = require('@src/services/users.services');
const { encryptData } = require('@src/utils/hashToken');
const { sendMailRegister } = require('@src/services/mail.services');

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

router.all('/account/resend-verification', async (req, res, next) => {
    let msg = '';

    if (req.method === 'POST') {
        const { email } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            msg = 'Email not found. Please choose another.';
        } else if (user.active) {
            msg = 'Your account has been verified!';
        } else {
            const token = crypto.randomBytes(32).toString('hex');
            // save token to verify_email DB
            await createVerifyCode(email, token);

            const encryptToken = encryptData(token); // send to user

            const emailPayload = {
                name: user.name,
                verify_link: `${process.env.BASE_URL}/account/verify?token=${encryptToken}`,
            };
            await sendMailRegister(email, emailPayload);

            msg = 'Verification code has been successfully sent';
        }
    }
    res.render('new_verification', { title: 'Request a new verification email', msg });
});

module.exports = router;
