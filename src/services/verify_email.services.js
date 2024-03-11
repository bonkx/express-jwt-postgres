/* eslint-disable import/no-unresolved */
const db = require('@src/entity/models');
const { decryptData } = require('@src/utils/hashToken');
const { findUserByEmail } = require('@src/services/users.services');

const { VerifyEmail } = db;

async function createVerifyCode(email, token) {
    try {
        const payload = {
            email,
            code: token,
        };
        // console.log(payload);
        const obj = await VerifyEmail.create(payload);

        return obj;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function validateCodeWeb(token) {
    try {
        console.log('token: ', token);
        // decrypt token
        const code = decryptData(token);
        console.log('code: ', code);
        // get instanceof token
        const obj = await VerifyEmail.findOne({ where: { code } });
        // console.log(obj.id);
        if (obj == null) {
            return 'Oops.. Wrong code! Try again...';
        }
        console.log('expired_at: ', new Date(obj.expired_at));
        console.log('now :', new Date());
        const now = new Date();
        if (obj.expired_at < now) {
            console.log('expired');
            return 'Oops.. The code has expired...';
        }

        if (obj.verified_at != null) {
            return 'Your account has been verified!';
        }

        // set verify_at
        obj.verified_at = now;
        await obj.save();

        // find user with email
        const user = await findUserByEmail(obj.email);
        user.active = true;
        await user.save();

        return 'Account Verification Successful!';
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createVerifyCode,
    validateCodeWeb,
};
