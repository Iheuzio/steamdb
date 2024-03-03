const request = require('supertest');
const app = require('../../app.js');
const DB = require('../../db/db.js');

jest.mock('../../db/db');

describe('Routes', () => {
  describe('GET /tickers', () => {
    test('It should respond with a JSON array of tickers', async () => {
      // Mock the database function to return tickers
      jest.spyOn(DB.prototype, 'readBySteamAPIId').mockResolvedValue([
        { 'title': 'Resident Evil 4' }
      ]);

      const response = await request(app).get('/localapi/steamgames/2050650');
      //if plain text, use text, if JSON use body
      expect(response.body).toEqual([
        { 'title': 'Resident Evil 4' }
      ]);
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
    });
  });
});


