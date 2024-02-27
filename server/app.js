const express = require('express');
const path = require('path');
const passport = require('passport');
const appRouter = require('./routes/steamIMDBRouter');

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

// 404 Handler
app.use('/apiv2', appRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(3000);

module.exports = app;
