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
        await db.createUser({
          provider: 'steam',
          _json: {
            steamid: '76561199641928112',
            communityvisibilitystate: 3,
            profilestate: 1,
            personaname: 'testerwester22',
            profileurl: 'https://steamcommunity.com/profiles/76561199641928112/',
            avatar: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70.jpg',
            avatarmedium: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70_medium.jpg',
            avatarfull: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70_full.jpg',
            avatarhash: 'e0a12200e37a0fcf51d9791e0407868c07433f70',
            personastate: 0,
            primaryclanid: '103582791429521408',
            timecreated: 1708355350,
            personastateflags: 0,
          },
          id: '76561199641928112',
          displayName: 'testerwester22',
          photos: [
            {
              value: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70.jpg',
            },
            {
              value: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70_medium.jpg',
            },
            {
              value: 'https://avatars.steamstatic.com/e0a12200e37a0fcf51d9791e0407868c07433f70_full.jpg',
            },
          ],
          identifier: 'https://steamcommunity.com/openid/id/76561199641928112',
        });
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
