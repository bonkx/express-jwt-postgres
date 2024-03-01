/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { sendMailRegister } = require('@src/services/mail.services');
const { findUserByEmail } = require('@src/services/users.services');

const router = express.Router();

router.post('/send', async (req, res, next) => {
    try {
        const { email } = { ...req.body };
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404);
            throw new Error('Email not found.');
        }

        const emailPayload = {
            name: user.name,
            verify_link: 'https://profile.oracle.com/myprofile/account/verify.jspx?key=99D29788F5AC7C1B24726DB13A1FB8005BEFB6EFA166C69D7200F2A84407F295295FEDE97B1F2FA51FFBE79F47A5DD1E6C1EDD25A53FB7557DF908F60071F8DB',
            type_of_action: 'Registration',
        };

        const data = await sendMailRegister(email, emailPayload);
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
