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
    // Mocking the database function
    jest.spyOn(DB.prototype, 'readBySteamAPIId').mockResolvedValue({
      'title': 'Resident Evil 4'
    });

    try {
      // Making the request to the mocked API endpoint
      const response = await request(app).get('/localapi/steamgames/2050650');

      // Assertions
      expect(response.body).toEqual({
        'title': 'Resident Evil 4'
      });
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
    } catch (error) {
      // Log any errors for debugging
      console.error('Test error:', error);
      throw error; // Re-throw the error to fail the test
    }
  });
});
