const { join, promisifyGet } = require('../utils/index');
const http = require('http');
const supertest = require('supertest');
const server = require('./index');
const { expect } = require('@jest/globals');

const request = supertest(server);
const url = '/api/alldata'

let mockServer;
beforeAll((done) => {
  mockServer = http.createServer(server);
  mockServer.listen(done); 
})
afterAll((done) => {
  mockServer.close();
  done();
})

describe('routes', () => {
  let res;
  test('sends a 405 if method is not a GET', async (done) => {
    request.post('/api/alldata')
      .expect(405, done);
  });
  test('response is valid JSON', (done) => {
    request.get(url)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  beforeAll(async () => {
    res = await request.get(url);
  })
  test('response object is properly shaped', async () => {
    const exRegistered = {
      id: '18',
      city: 'Ahmadton',
      company: 'Auer, Daniel and Walker',
      country: 'Yemen',
      firstName: 'firstName 18',
      lastName: 'lastName 18',
      organizationType: 'organizationType 18',
      phone: '219-323-5624 x320',
      state: 'NE',
      zipCode: '80976-0463',
      disclaimerAccepted: false,
      languageCode: 'en',
      emailAddress: 'last18@mail.com'
    };
    const exUnregistered = {
      id: '211',
      emailAddress: 'email11@somewhere.com',
      languageCode: 'en',
      registrationId: 'jwsMJNOk3oM3hVM5bGcF11',
      registrationIdGeneratedTime: '1561650268511'
    }
    const regKeys = Object.keys(res.body.filter(o => o.zipCode)[0])
    const unregKeys = Object.keys(res.body.filter(o => !o.zipCode)[0])
    expect(regKeys).toEqual(expect.arrayContaining([...Object.keys(exRegistered), 'projectIds']));
    expect(unregKeys).toEqual(expect.arrayContaining([...Object.keys(exUnregistered), 'projectIds']));
  });
  test('all responses contain a projectId that is an array', async () => {
    res.body.forEach(response => {
        expect(response).toHaveProperty('projectIds', expect.any(Array));
    })
  })
})