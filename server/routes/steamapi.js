const express = require('express');
const router = express.Router();
  
//Since SteamAPI doesn't allow calls directly from the client
router.get('/:gamelink', async (req, res) => {
  try{
    // eslint-disable-next-line max-len
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${req.params.gamelink}`);
    if(response.ok){
      const gameData = await response.json();
      res.type('json');
      res.json(gameData);
    }else {
      res.status(500).json({error : 'Problem occurred when fetching data from the steam api'});
    }
  } catch(error){
    res.status(500).json({error : 'Problem occurred when fetching data from the steam api'});
  }
});

module.exports = router;