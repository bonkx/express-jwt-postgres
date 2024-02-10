const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  res.json({ detail: 'respond with a resourcess' });
});

module.exports = router;
