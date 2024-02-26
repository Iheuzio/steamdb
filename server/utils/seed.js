const DB = require('../db/db');
const fs = require('fs');
const path = require('path');

(async () => {
  let db;
  try {
    db = new DB();
    await db.connect('test', 'dataset');
    const csvFile = fs.readFileSync(path.join(__dirname, `../dataset/game_data_all.csv`), 'utf-8');

    const rows = csvFile.split('\n');
    const dataset = [];
    
    for (let i = 1; i < 200; i++) {
      const row = rows[i].split(',');
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


