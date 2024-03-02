/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const { emailQueue } = require('@src/utils/queue');
const Mailgen = require('mailgen');

async function sendMailRegister(email, payload) {
    console.log(payload);
    // Render email template
    // const template = fs.readFileSync('./src/views/emails/registration.hbs', 'utf8');
    // const html = Mustache.render(template, { ...payload });

    // Configure mailgen by setting a theme and your product info
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: process.env.APP_NAME,
            link: process.env.BASE_URL,
            // Optional product logo
            logo: 'https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png',
        },
    });

    const newVerificationEmail = `${process.env.BASE_URL}/account/resend-verification`;
    const response = {
        body: {
            name: payload.name,
            intro: `Welcome to ${process.env.APP_NAME} App! We're very excited to have you on board.`,
            action: {
                instructions: `To get started with ${process.env.APP_NAME}, please click here:`,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify Email Address',
                    link: payload.verify_link,
                },
            },
            outro: `This link will expire in 24 hours. If it has expired, try to <a target="_blank" href="${newVerificationEmail}">request a new verification email</a>. <br><br>`
            + 'Need help, or have questions? Just reply to this email, we\'d love to help.',
        },
    };

    // Generate an HTML email with the provided contents
    const emailBody = mailGenerator.generate(response);
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(response);

    const emailPayload = {
        emails: [email],
        subject: 'Verify Your Email Address',
        text: emailText,
        html: emailBody,
    };

    emailQueue.add({ to: email, payload: emailPayload }, {
        removeOnComplete: true,
    });
    return 'Email sent';
}

module.exports = {
    sendMailRegister,
};
