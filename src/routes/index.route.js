const express = require('express');

const usersRouter = require('./users.route');
const authRouter = require('./auth.route');

const router = express.Router();

// PUBLIC ROUTES
router.use('/auth', authRouter);

// PRIVATE ROUTES
// router.get("/user/me", controller("UserController#me"));
router.use('/users', usersRouter);

module.exports = router;
