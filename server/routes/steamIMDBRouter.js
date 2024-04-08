const express = require('express');
const router = express.Router();
const DB = require('../db/db');

const db = new DB();

const pageSize = 20; 

router.get('/search/:type', async (req, res, next) => {
  const page = req.query.page || 1;

  if (isNaN(page) || page < 0 || page > 10000) {
    res.status(400).json({ error: 'Invalid page number. Page must be between 0 and 10000' });
    return;
  }

  next();
});

router.get('/search/string', async (req, res) => {
  try {
    const allowedFields = ['title', 'publisher', 'developer'];

    const page = req.query.page;
    const query = req.query.query || ' ';
    const field = req.query.field || allowedFields[0];

    if (!allowedFields.includes(field)) {
      res.status(400).json(
        { error: 'Invalid field parameter. Field must be one of: title, publisher, developer' }
      );
      return;
    }

    const steamGames = await db.readByQuery(field, String(query), pageSize, page);

    if (!steamGames.length) {
      res.status(404).json({ error: 'No games were found' });
      return;
    }

    res.status(200).json(steamGames);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, try again later' });
  }
});

router.get('/search/number', async (req, res) => {
  try {
    const page = req.query.page;
    const query = req.query.query || 5000;
    const field = req.query.field || 'peak';
    const operator = req.query.operator || 'lt';

    const allowedFields = ['peak'];

    if (!allowedFields.includes(field)) {
      res.status(400).json(
        { error: 'Invalid field parameter. Field must be one of: peak' }
      );
      return;
    }

    if (isNaN(query) || query < 0) {
      res.status(400).json({ error: 'Invalid query parameter. Query must be a positive number' });
      return;
    }

    const allowedOperators = ['lt', 'gt', 'eq'];

    if (!allowedOperators.includes(operator)) {
      res.status(400).json(
        { error: 'Invalid operator parameter. Operator must be one of: lt, gt, eq' }
      );
      return;
    }

    const steamGames = await db.readByDateOrNumber(field, query, operator, pageSize, page);

    if (!steamGames.length) {
      res.status(404).json({ error: 'No games were found' });
      return;
    }

    res.status(200).json(steamGames);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, try again later' });
  }
});

router.get('/search/date', async (req, res) => {
  try {
    const page = req.query.page;
    let query = req.query.query || '06-06-2022';
    const field = req.query.field || 'release_date';
    const operator = req.query.operator || 'lt';

    const allowedFields = ['release_date'];

    if (!allowedFields.includes(field)) {
      res.status(400).json(
        { error: 'Invalid field parameter. Field must be one of: release_date' }
      );
      return;
    }

    query = new Date(query);

    if (!(query instanceof Date && !isNaN(query))) {
      res.status(400).json(
        { error: 'Invalid query parameter. Query must be a valid date' +
        'in the following format: dd-mm-yyyy' }
      );
      return;
    }

    const allowedOperators = ['lt', 'gt', 'eq'];

    if (!allowedOperators.includes(operator)) {
      res.status(400).json(
        { error: 'Invalid operator parameter. Operator must be one of: lt, gt, eq' }
      );
      return;
    }

    const steamGames = await db.readByDateOrNumber(field, query, operator, pageSize, page);

    if (!steamGames.length) {
      res.status(404).json({ error: 'No games were found' });
      return;
    }

    res.status(200).json(steamGames);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: 'Something went wrong, try again later' });
  }
});


// currently being refactored / deprecated
router.get('/steamgames', async (req, res) => {
  try {
    const genre =    req.query.genre;
    const operator = req.query.operator;
    let query =      req.query.query;
    let field =      req.query.field;
    const page =       req.query.page;
    let textQuery =  false;

    const textFields = ['title', 'publisher', 'developer'];

    if (field) {
      textQuery = textFields.includes(field);
    }

    const recordsToSend = 20;

    let steamGames = [];

    if (textQuery && query) {
      steamGames = await db.readByQuery(field, String(query), recordsToSend, page);
    } else if (!operator || !query || !field) {
      field = 'title';
      query = 'ab';
      steamGames = await db.readByQuery(field, String(query), recordsToSend, page);
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

//check if user has already reviewd a game -- return 1 for true, 2 for false
router.get('/reviews/checkVote/:reviewerID', async (req, res) => {
  
  try{
    const data = await db.checkVote(req.query.objID, req.params.reviewerID);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }

});

//add user to upvote array of a review
router.post('/reviews/changeVote', async (req, res) => {

  try {
    //if vote is true, we increase score
    if(!req.body.vote){
      const data = await db.addUpvote(req.body.objID, req.body.reviewer);
      res.send(data);
    }else{
      const data = await db.removeUpvote(req.body.objID, req.body.reviewer);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
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

router.get('/user/:userID/games', async (req, res) => {
  try {
    const userGameList = await db.getUserList(req.params.userID);
    res.json(userGameList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user game list
router.post('/user/:userID/updateList', async (req, res) => {
  try {
    const newUserList = await db.createUserList(req.params.userID, req.body.games);
    res.status(201).json(newUserList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;