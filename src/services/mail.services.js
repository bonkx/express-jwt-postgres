/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const Mustache = require('mustache');
const fs = require('fs');
const { emailQueue } = require('@src/utils/queue');

async function sendMailRegister(payload) {
    console.log(payload);
    // Render email template
    const template = fs.readFileSync('./src/views/emails/registration.hbs', 'utf8');
    const html = Mustache.render(template, { ...payload });

    const emailPayload = {
        emails: [payload.email],
        subject: 'Success Registration',
        // text: html,
        html,
    };

    emailQueue.add({ to: payload.email, payload: emailPayload }, {
        removeOnComplete: true,
    });
    return 'Email sent';
}

module.exports = {
    sendMailRegister,
};
