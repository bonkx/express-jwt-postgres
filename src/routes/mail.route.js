/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { sendMail, sendMailRegister } = require('@src/services/mail.services');

let emailPayload = {
    emails: [], subject: '', text: '', html: '',
};

const router = express.Router();

router.post('/send', async (req, res, next) => {
    try {
        const payload = { ...req.body };
        emailPayload = {
            emails: req.body.emails,
            subject: 'Test email',
            text: 'Hallo',
            html: '<b>Hallo</b>',
        };
        // const data = await sendMail(emailPayload);
        const data = await sendMailRegister(payload);
        successRes(res, data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
