const express = require('express');
const app = express();
const path = require('path');
const appRouter = require('./routes/steamIMDBRouter');

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api', appRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
