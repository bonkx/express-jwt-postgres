var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    res.json({ 'detail': 'respond with a resourcess' });
});

module.exports = router;
