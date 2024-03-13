const session = require('express-session');
const SteamStrategy = require('../lib/passport-steam').Strategy;
const DB = require('../db/db');

const db = new DB();

module.exports = function(passport, app) {
  // Passport session setup.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(async function(obj, done) {
    try {
      const user = await db.getUserBySteamId(obj.id);
      if(!user) {
        //convert it 
        await db.createUser(obj);
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  const env = process.env.STEAM_REL || 'localhost:3001';

  // Use the SteamStrategy within Passport.
  passport.use(new SteamStrategy({
    returnURL: `http://${env}/auth/steam/return`,
    realm: `http://${env}/`,
    apiKey: '1EDC0D204A7716E809F0B2DABE207BE7'
  },
  function(identifier, profile, done) {
    process.nextTick(async function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
  ));

  // configure Express
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');

  app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
