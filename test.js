var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('./bin/www');
chai.use(chaiHttp);

var request = require('supertest');
describe('Test express server', function () {
  var testServer;
  beforeEach(function () {
    testServer = require('./bin/www');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(testServer)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(testServer)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('trending endpoint', function() {
  it('should return status 200 on GET req to /v1/gifs/trending', function(done) {
    request(server)
      .get("http://api.giphy.com/v1/gifs/trending?api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp")
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
