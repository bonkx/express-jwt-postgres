const express = require('express');

const usersRouter = require('./users');
const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/ping', (req, res) => res.json('pong'));

router.group('/api/v1', (api) => {
    // PUBLIC ROUTES
    api.use('/auth', authRouter);

    api.group((router) => {
    // Make sure all routes in this group use authentication
    // router.use(authentication);

        // router.get("/user/me", controller("UserController#me"));
        router.use('/users', usersRouter);
    });
});

module.exports = router;
