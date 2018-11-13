const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with inserted message', function(done) {
    const result = {
      name: 'CJ',
      message: 'This app is so cool!',
      latitude: -90,
      longitude: 180
    };
    request(app)
      .post('/api/v1/messages')
      .body(result)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, result, done);
  });
});
