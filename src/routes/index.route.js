const express = require('express');

const usersRouter = require('./users.route');
const authRouter = require('./auth.route');
const adminRouter = require('./admin.route');

const router = express.Router();

// PUBLIC ROUTES
router.use('/auth', authRouter);

// PRIVATE ROUTES
// router.get("/user/me", controller("UserController#me"));
router.use('/users', usersRouter);

// ADMIN ROUTES
router.use('/admin', adminRouter);

module.exports = router;
