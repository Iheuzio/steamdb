const express = require('express');
const path = require('path');
const passport = require('passport');

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
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(3000);
