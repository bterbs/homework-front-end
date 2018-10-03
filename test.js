var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('./bin/www');
const nock = require('nock');
var request = require('supertest');
const response = require('./response');
// const getGifs = require('./public/javascripts/scripts.js').getUser;

chai.use(chaiHttp);

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

// describe('trending endpoint', function() {
//   it('should return status 200 on GET req to /v1/gifs/trending', function(done) {
//     request(server)
//       .get("http://api.giphy.com/v1/gifs/trending?api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp")
//       .end(function(err, res){
//         res.should.have.status(200);
//         done();
//       });
//   });
// });

// describe('Get User tests', () => {
//   beforeEach(() => {
//     nock('http://api.giphy.com/')
//       .get('v1/gifs/trending?api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp')
//       .reply(200, response);
//   });
//
//   it('getGifs returns gifs', () => {
//     return getGifs(25)
//       .then(response => {
//         //expect an object back
//         expect(typeof response).to.equal('object');
//       });
//   });
// });
