const request = require('supertest');
const app = require('../../app.js');
const DB = require('../../db/db.js');

jest.mock('../../db/db');

beforeEach(() => {
  jest.clearAllMocks();
});

// Unit test for calling the mock API
describe('GET /localapi/:2050650', () => {
  test('It should respond with the game API id', async () => {
    jest.spyOn(DB.prototype, 'readBySteamAPIId').mockResolvedValue({
      'title': 'Resident Evil 4'
    });

    try {
      // Making the request to the mocked API endpoint
      const response = await request(app).get('/localapi/steamgames/2050650');


      expect(response.body).toEqual({
        'title': 'Resident Evil 4'
      });
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');

    } catch (error) {
      console.error('Test error:', error);
      throw error; 
    }
  });

  
  // Disconnect from the database after all tests are done
  afterAll(async () => {
    await DB.prototype.close();
  });
});
