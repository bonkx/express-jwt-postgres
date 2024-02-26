/* eslint-disable import/no-extraneous-dependencies */
const Queue = require('bull');
const nodemailer = require('nodemailer');

const { REDIS_URL } = process.env;

// Initiating the Queue with a redis instance
const emailQueue = new Queue('emails', REDIS_URL);

// Initiating the transporter nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: true,
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
    },
});

emailQueue.process(async (job) => {
    const { payload } = job.data;
    console.log(`Sending email to ${job.data.to}`);
    const info = await transporter.sendMail({
        from: `"${process.env.DEFAULT_FROM_NAME}" ${process.env.DEFAULT_FROM_EMAIL}`, // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: payload.emails.join(','),
        subject: payload.subject, // Subject line
        text: payload.text, // plain text body
        html: payload.html, // html body
    });

    console.log('Email sent: %s', info.messageId);
});

module.exports = { emailQueue };
