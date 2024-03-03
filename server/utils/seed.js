const DB = require('../db/db');
const fs = require('fs');
const path = require('path');

async function retreiveSteamDescription(appID){

  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`);
  if(!response.ok){
    throw new Error('Error occured fetching songs!', appID);
  }
  const data = await response.json();
  try{
    return data[appID]['data']['header_image'];
  } catch{
    return 'No Description Available';
  }
}


(async () => {
  let db;
  try {
    db = new DB();
    await db.connect('dataset', 'dataset');
    // eslint-disable-next-line max-len
    const csvFile = fs.readFileSync(path.join(__dirname, `../dataset/dataset_limited.csv`), 'utf-8');

    const rows = csvFile.split('\n');
    const dataset = [];
    
    for (let i = 1; i < 50; i++) {
      const row = rows[i].split(',');

      //fetch description from steam api
      const gameID = row[2].match(/\d+/g);
      const descriptionData = await retreiveSteamDescription(gameID[0]);

      console.log(i);

      const game = {
        title: row[1],
        steam_api: row[2],
        release_date: row[3],
        peak: row[4],
        positive_reviews: row[5],
        negative_reviews: row[6],
        primary_genre: row[9],
        publisher: row[12],
        developer: row[13],
        description: descriptionData
      };
      dataset.push(game);
    }

    console.log('Seeding database...');
    await db.createManyGameData(dataset);
    console.log('Successfully seeded');
    
  } catch (e) {
    console.error('Could not seed');
    // eslint-disable-next-line no-console
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
})();


