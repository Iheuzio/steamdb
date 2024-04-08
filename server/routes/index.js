const express = require('express');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  console.log('req.user:', req.user);
  res.json({ user: req.user });
});

module.exports = router;
