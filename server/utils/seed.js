const DB = require('../db/db');
const fs = require('fs');
const path = require('path');

(async () => {
  let db;
  try {
    db = new DB();
    await db.connect('dataset', 'dataset');
    
    const files = fs.readdirSync(path.join(__dirname, '../dataset'));
    const dataToInsert = [];

    for (const file of files) {
      // eslint-disable-next-line no-console
      const data = fs.readFileSync(path.join(__dirname, `../dataset/${file}`), 'utf-8');
      const rows = data.split('\n');
      const columns = rows[0].split(',');
      const dataset = [];
      
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length !== columns.length || row[0] === '') {
          continue;
        }
        const user = {
          username: row[0],
          password: row[1],
        };
        dataset.push(user);
      }
      
      dataToInsert.push({ data: dataset });
    }
    console.log('Seeding database...');
    await db.createManyUserData(dataToInsert);
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
