const express = require('express');

const authRouter = require('./auth/auth.routes');
const usersRouter = require('./users/users.routes');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.get('/ping', (req, res) => res.json('pong'));

router.group('/api/v1', (api) => {
    // PUBLIC ROUTES
    api.use('/auth', authRouter);

    // PRIVATE ROUTES
    api.group((router) => {
    // Make sure all routes in this group use authentication
    // router.use(authentication);

        // router.get("/user/me", controller("UserController#me"));
        router.use('/users', usersRouter);
    });
});

module.exports = router;
