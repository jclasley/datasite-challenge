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

server.listen(process.env.PORT || 8080);

// {
//   "id": "1",
//     "city": "Jaydashire",
//       "company": "Goyette - Renner",
//         "country": "South Africa",
//           "firstName": "firstName 1",
//             "lastName": "lastName 1",
//               "organizationType": "organizationType 1",
//                 "phone": "524.276.1570 x487",
//                   "state": "SD",
//                     "zipCode": "68048",
//                       "disclaimerAccepted": false,
//                         "languageCode": "en",
//                           "emailAddress": "last1@mail.com",
//                             "projectIds": ["1", "2"]
// },