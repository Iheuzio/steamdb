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
        link: row[2],
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
