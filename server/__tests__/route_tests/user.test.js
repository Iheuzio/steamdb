const request = require('supertest');
const app = require('../../app.js');
const DB = require('../../db/db.js');

jest.mock('../../db/db');

beforeAll(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await DB.prototype.close();
  //await mongoServer.stop();
});


//Unit test for calling the mock api

describe('GET /steamgames/:2050650', () => {
  test('It should respond the game api id', async () => {
    jest.spyOn(DB.prototype, 'readBySteamAPIId').mockResolvedValue(
      {'title' : 'Resident Evil 4'}
    );

    const response = await request(app).get('/localapi/steamgames/2050650');
    expect(response.body).toEqual(
      {'title' : 'Resident Evil 4'}
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});


