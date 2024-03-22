const express = require('express');
const path = require('path');
const passport = require('passport');
const appRouter = require('./routes/steamIMDBRouter');
const steamAPIRouter = require('./routes/steamapi');

const app = express();


// Middleware
app.use('/api', require('./routes/auth'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Passport setup and configuration
require('./config/passport')(passport, app);

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/account'));
app.use('/', require('./routes/auth-steam'));

// route to the mongo db api
app.use('/localapi', appRouter);

// Route to call the SteamAPI from the client since it does not allow for CORS
app.use('/steamapi', steamAPIRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

//ping the server to keep it up


module.exports = app;
