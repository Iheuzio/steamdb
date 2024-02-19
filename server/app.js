const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
