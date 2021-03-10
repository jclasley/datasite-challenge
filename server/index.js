const http = require('http');
const { join, promisifyGet } = require('../utils/index');

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/alldata' && req.method === 'GET') {
    try {
      const registered = await promisifyGet('https://5c3ce12c29429300143fe570.mockapi.io/api/registeredusers');
      const unregistered = await promisifyGet('https://5c3ce12c29429300143fe570.mockapi.io/api/unregisteredusers');
      const projects = await promisifyGet('https://5c3ce12c29429300143fe570.mockapi.io/api/projectmemberships');

    const joined = [...join(registered, projects), ...join(unregistered, projects)];
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(joined));
    res.end();
    } catch (err) {
      res.writeHead(500);
      res.write(err.toString());
      res.end();
    }
  }
  if (req.url === '/api/alldata' && req.method !== 'GET') {
    res.writeHead(405);
  }
  res.end();
});

module.exports = server;
