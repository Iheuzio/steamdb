const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/account' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/account' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
