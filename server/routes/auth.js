var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping 
  // the full url, causing assertion to fail 
  function(req, res, next) {
    req.url = req.originalUrl;
    next();
  }, 
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.post('/recaptcha', (req, res) => {
  const token = req.body.token;
  // verify the token using Google's API
  const url = 'https://www.google.com/recaptcha/api/siteverify?secret=' +
    '6Lf5tLMpAAAAADJLdrKRScI5Gi3EsLYwsAkDy08n' +
    '&response=' +
    token;
  fetch(url, {
    method: 'POST',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to verify reCAPTCHA token');
      }
      return response.json();
    })
    .then(googleResponse => {
      res.json({ googleResponse });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while verifying the reCAPTCHA.' });
    });
});

module.exports = router;