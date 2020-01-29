const expect = require('chai').expect;
const server = require('../index');

describe('test', () => {
  it('should return a string', () => {
    expect('RestHub api started...').to.equal('RestHub api started...');
  });
});
