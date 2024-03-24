const express = require('express');
const router = express.Router();
const DB = require('../db/db');

const db = new DB();
  
router.get('/steamgames', async (req, res) => {
  try {
    const genre = req.query.genre;
    const operator = req.query.operator;
    let query = req.query.query;
    const field = req.query.field;
    let textQuery = false;

    let steamGames = [];
    
    if (/^[a-zA-Z ]+$/.test(String(query))) {
      textQuery = true;
    }

    if (textQuery && query) {
      steamGames = await db.readByQuery(field, String(query));
    } else if (!operator || !query || !field) {
      steamGames = await db.readAll();
    } else {
      if (field === 'release_date') {
        query = new Date(query);
      }

      steamGames = await db.readByDateOrNumber(field, query, operator);
    }

    if (genre && genre !== 'All') {
      steamGames = steamGames.filter(game => {
        return game.primary_genre === genre;
      });
    }

    res.type('json');

    if (!steamGames.length) {
      res.status(404).json({error: 'No games were found'});
    } else {
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
router.post('/reviews', async (req, res) => {

  try {
    const data = await db.createReview(req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send(error('Error adding review'));
  }
});


router.get('/reviews/:gameID', async (req, res) => {
  try {
    const reviews = await db.getAllReviewsOfGame(`${req.params.gameID}`);
    if (!reviews) {
      res.status(404).json({error : 'No Reviews for this game'});
    } else{
      res.type('json');
      res.json(reviews);
    }
    
  } catch (error) {
    res.status(500).json({error : 'Something went wrong, try again later'});
  }
});


module.exports = router;