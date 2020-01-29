var assert = require('assert'),
  http = require('http');

/**
 * Test for API's landing pages
 * Navigates tester class to API's homepage 
 * **/
describe('/', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3338/', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  /* it('should say "API Its Working"', function (done) {
  http.get('http://localhost:8080/', function (res) {
    var data = '';
  
    res.on('data', function (chunk) {
      data += chunk;
    });
  
    res.on('end', function () {
      assert.equal('API Its Working', data.status);
      console.log(data);
      done();
    });
  });
  }); */
});
