/* eslint-disable import/no-unresolved */
const express = require('express');

const { isAuthenticated } = require('@src/middlewares');
const usersRouter = require('./users.route');
const authRouter = require('./auth.route');
const adminRouter = require('./admin.route');
const accountRouter = require('./account.route');

const router = express.Router();

// PUBLIC ROUTES
router.use('/auth', authRouter);

// PRIVATE ROUTES
// router.get("/user/me", controller("UserController#me"));
router.use('/accounts', isAuthenticated, accountRouter);
router.use('/users', usersRouter);

// ADMIN ROUTES
router.use('/admin', adminRouter);

module.exports = router;
