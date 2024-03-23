const express = require('express');
const router = express.Router();
const DB = require('../db/db');

const db = new DB();
  
router.get('/steamgames', async (req, res) => {
  try {
    const operator = req.query.operator;
    let value = req.query.value;
    const field = req.query.field;

    res.type('json');

    if (!operator || !value || !field) {
      const steamGames = await db.readAll();
      res.json(steamGames);
      
    } else {
      if (field === 'release_date') {
        value = new Date(value);
      }

      const steamGames = await db.readByDateOrNumber(field, value, operator);
      res.json(steamGames);
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).json({error : 'Something went wrong, try again later'});
  }
});

//Gets a steam game from the DB based on its unique steam_api_id
  
router.get('/steamgames/:steam_api_id', async (req, res) => {
  try {
    const game = await db.readBySteamAPIId(`/app/${req.params.steam_api_id}/`);
    if (!game) {
      res.status(404).json({error : 'No game with that id'});
    } else{
      res.type('json');
      res.json(game);
    }
    
  } catch (error) {
    res.status(500).json({error : 'Something went wrong, try again later'});
  }
});

//Adds the given review to the server
router.post('/reviews/addReview', async (req, res) => {

  try {
    db.createReview(req.body).then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500).send(error('Error adding review'));
  }

});

module.exports = router;