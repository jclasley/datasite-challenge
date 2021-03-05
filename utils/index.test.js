const { join, promisifyGet } = require('./index');
const https = require('https');
const { afterEach, expect } = require('@jest/globals');
jest.mock('https');


describe('promisifyGet', () => {
  let url;
  let res;
  beforeEach(() => {
    res = [{ "id": "1", "city": "Jaydashire", "company": "Goyette - Renner", "country": "South Africa", "firstName": "firstName 1", "lastName": "lastName 1", "organizationType": "organizationType 1", "phone": "524.276.1570 x487", "state": "SD", "zipCode": "68048", "disclaimerAccepted": false, "languageCode": "en", "emailAddress": "last1@mail.com" }];
    https.get.mockResolvedValue(res);
    url = 'https://5c3ce12c29429300143fe570.mockapi.io/api/registeredusers'
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('calls get and returns a promise', () => {
    const res = promisifyGet(url);
    expect(https.get).toHaveBeenCalled();
    expect(res).toBeInstanceOf(Promise);
  })
  test('rejects if url is bad', () => {
    url = 'https://jon.com/badRoute';
    expect(promisifyGet(url)).rejects.toBeInstanceOf(Error);
  });
  test('resolves to JSON of result', () => {
    const res = promisifyGet(url);
    expect(res).resolves.toBeInstanceOf(String);
    expect(res).resolves.toBe(expect.stringContaining(JSON.stringify(res)));
  })
});

describe('join', () => {
  let userObj = [{ "id": "1", "city": "Jaydashire", "company": "Goyette - Renner", "country": "South Africa", "firstName": "firstName 1", "lastName": "lastName 1", "organizationType": "organizationType 1", "phone": "524.276.1570 x487", "state": "SD", "zipCode": "68048", "disclaimerAccepted": false, "languageCode": "en", "emailAddress": "last1@mail.com" }];
  let projectObj = [{ "id": "1", "projectId": "1", "userId": "1" }, { "id": "2", "projectId": "2", "userId": "1" }, { "id": "3", "projectId": "3", "userId": "3" }, { "id": "4", "projectId": "4", "userId": "4" }, { "id": "5", "projectId": "5", "userId": "5" }, { "id": "6", "projectId": "6", "userId": "6" }, { "id": "7", "projectId": "7", "userId": "7" }, { "id": "8", "projectId": "8", "userId": "8" }, { "id": "9", "projectId": "9", "userId": "8" }, { "id": "10", "projectId": "10", "userId": "" }, { "id": "11", "projectId": "11", "userId": "11" }, { "id": "12", "projectId": "12", "userId": "12" }];
  
  test('shape of returned is correct', () => {
    const [res] = join(userObj, projectObj);
    expect(res).toEqual(expect.objectContaining(userObj[0]));
    expect(res).toEqual(expect.objectContaining({...userObj[0], 'projectIds': expect.any(Array)}))
  });
  test('object contains relevant project ids', () => {
    const [{ projectIds }] = join(userObj, projectObj);
    expect(projectIds).toEqual(expect.arrayContaining(['1', '2']))
  })
})