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

module.exports = router;
