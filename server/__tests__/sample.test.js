const { testFunction } = require('../utils/utils.js');

test('testing addition with testFunction', () => {
  expect(testFunction(2,5)).toBe(7);
});

