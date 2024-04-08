const request = require('supertest');
const app = require('../../app.js');

const madballsObj = {
    "_id": "660c431148be031fc10aa142",
    "title": "Madballs in...Babo: Invasion",
    "steam_api": "/app/25700/",
    "release_date": "2009-09-17T00:00:00.000Z",
    "peak": 4017,
    "positive_reviews": 236,
    "negative_reviews": 44,
    "primary_genre": "Action",
    "publisher": " Indie (23)\"",
    "developer": "Playbrains",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/25700.png",
    "__v": 0
};

const itzaObj = {
    "_id": "660c431148be031fc10aa1ae",
    "title": "ItzaBitza",
    "steam_api": "/app/40200/",
    "release_date": "2009-10-14T00:00:00.000Z",
    "peak": 11,
    "positive_reviews": 8,
    "negative_reviews": 3,
    "primary_genre": "Unknown",
    "publisher": "Sabi Games",
    "developer": "Sabi Games",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/40200.png",
    "__v": 0
};

const sacraboarObj = {
    "_id": "660c431148be031fc10aa1e5",
    "title": "Sacraboar",
    "steam_api": "/app/40500/",
    "release_date": "2009-11-06T00:00:00.000Z",
    "peak": 8,
    "positive_reviews": 16,
    "negative_reviews": 49,
    "primary_genre": "Action",
    "publisher": " Indie (23)\"",
    "developer": "Makivision Games",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/40500.png",
    "__v": 0
};

const raymanObj = {
    "_id": "660c431148be031fc10aa232",
    "title": "Rayman: Raving Raids",
    "steam_api": "/app/15080/",
    "release_date": "2008-06-13T00:00:00.000Z",
    "peak": 30,
    "positive_reviews": 880,
    "negative_reviews": 175,
    "primary_genre": "Action",
    "publisher": "Ubisoft",
    "developer": "Ubisoft Bulgaria",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/15080.png",
    "__v": 0
};

const spectraballObj = {
    "_id": "660c431148be031fc10aa255",
    "title": "Spectraball",
    "steam_api": "/app/18300/",
    "release_date": "2008-10-20T00:00:00.000Z",
    "peak": 350,
    "positive_reviews": 364,
    "negative_reviews": 112,
    "primary_genre": "Indie",
    "publisher": " Unknown Genre (34)\"",
    "developer": "Shorebound Studios",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/18300.png",
    "__v": 0
};

const samObj = {
    "_id": "660c431148be031fc10aa2d5",
    "title": "Sam & Max 104: Abe Lincoln Must Die!",
    "steam_api": "/app/8230/",
    "release_date": "2007-06-15T00:00:00.000Z",
    "peak": 291,
    "positive_reviews": 398,
    "negative_reviews": 69,
    "primary_genre": "Adventure",
    "publisher": "Telltale Games",
    "developer": "Telltale Games",
    "description": "",
    "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/8230.png",
    "__v": 0
};

jest.mock('../../db/db', () => {
  class DB {
    constructor() {

    }

    async readByDateOrNumber(field, value, operator, quantity, page) {
        const readByDateOrNumberData = [ madballsObj, itzaObj, sacraboarObj ];

        const filteredData = readByDateOrNumberData.filter(game => {
            if (operator === 'eq') {
                return game[field] === value;
            } else if (operator === 'gt') {
                return game[field] > value;
            } else if (operator === 'lt') {
                return game[field] < value;
            }
        });
    
        const startIndex = page * quantity;
        const endIndex = startIndex + quantity;
    
        return filteredData.slice(startIndex, endIndex);
    }
    
  
    async readByQuery(field, value, quantity, page) {
        const readByQueryData = [ raymanObj, spectraballObj, samObj ];

        const filteredData = readByQueryData.filter(x => x[field].toLowerCase().includes(value.toLowerCase()));
        
        return filteredData.slice(page * quantity - quantity, page * quantity);
    }
  }

  return DB;
});

// describe('GET /steamgames', () => {
//     test('Test route with no query parameters', async () => {
//         const response = await request(app).get('/localapi/steamgames');

//         expect(response.body).toEqual([ spectraballObj, samObj ]);
//         expect(response.statusCode).toBe(200);
//         expect(response.type).toEqual('application/json');
//     });

//     test('Test valid field query parameter', async () => {
//         const response = await request(app).get('/localapi/steamgames?field=title&query=pec');

//         expect(response.body).toEqual([ spectraballObj ]);
//         expect(response.statusCode).toBe(200);
//         expect(response.type).toEqual('application/json');
//     });

//     test('Test valid field query parameter without query', async () => {
//         const response = await request(app).get('/localapi/steamgames?field=notquery');

//         expect(response.body).toEqual([ spectraballObj, samObj ]);
//         expect(response.statusCode).toBe(200);
//         expect(response.type).toEqual('application/json');
//     });
// });