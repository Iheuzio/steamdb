const request = require('supertest');
const app = require('../../app.js');

const readByDateOrNumberData = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
      "_id": "660c431148be031fc10aa1f9",
      "title": "Oddworld: Abe's Exoddus",
      "steam_api": "/app/15710/",
      "release_date": "2008-08-28T00:00:00.000Z",
      "peak": 60,
      "positive_reviews": 1331,
      "negative_reviews": 72,
      "primary_genre": "Adventure",
      "publisher": "Oddworld Inhabitants",
      "developer": "nan",
      "description": "",
      "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/15710.png",
      "__v": 0
    }
];

const readByQueryData = [
    {
        "_id": "660c431148be031fc10aa21d",
        "title": "Oddworld: Abe's Oddysee",
        "steam_api": "/app/15700/",
        "release_date": "2008-08-28T00:00:00.000Z",
        "peak": 45049,
        "positive_reviews": 3478,
        "negative_reviews": 587,
        "primary_genre": "Adventure",
        "publisher": "Oddworld Inhabitants",
        "developer": "nan",
        "description": "",
        "image_url": "https://shlomytestcontainer.blob.core.windows.net/imageblobtest/15700.png",
        "__v": 0
    },
    {
        "_id": "660c431148be031fc10aa232",
        "title": "Rayman: Raving Rabbids",
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
    },
    {
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
    },
    {
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
    }
];

jest.mock('../../db/db', () => {
  class DB {
    constructor() {

    }

    async readByDateOrNumber(field, value, operator, quantity, page) {
      return readByDateOrNumberData;
    }
  
    async readByQuery(field, value, quantity, page) {
      return readByQueryData;
    }
  }

  return DB;
});

describe('GET /steamgames', () => {
    test('Should respond with JSON array', async () => {
        const response = await request(app).get('/localapi/steamgames');

        expect(response.body).toEqual(readByQueryData);
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
  });

