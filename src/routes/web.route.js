/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const express = require('express');
const { successRes } = require('@src/utils/response');
const { findAll } = require('@src/services/users.services');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.get('/ping', (req, res) => res.json('pong'));

router.get('/email/codepen', (req, res, next) => {
    res.render('emails/codepen', { title: 'Express' });
});
router.get('/email/reg', (req, res, next) => {
    res.render('emails/registration', {
        name: 'Farrid',
        verify_link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010',
        type_of_action: 'Registration',
    });
});

module.exports = router;
