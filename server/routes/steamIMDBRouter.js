const express = require('express');
const router = express.Router();
const DB = require('../db/db');

const db = new DB();

router.get('/test', (req, res) => {
  res.type('json');
  res.send({'data' : 'Hello World!'});
});

router.get('/', (req, res) => {
  res.type('json');
  res.send({'data' : 'Hello World!'});
});
  
router.get('/steamgames', (req, res) => {
  try {
    db.readAll().then((data) => {
      if (!data) {
        res.status(404).send('Games not found');
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error('Error reading games'));
  }
});
  
router.get('/steamgames/:id', (req, res) => {
  try {
    db.readById(req.params.id).then((data) => {
      if (!data) {
        res.status(404).send('Game not found');
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error('Error reading game data'));
  }
});

module.exports = router;