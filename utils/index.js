const https = require('https');

module.exports.join = (userObj, projectObj) => {
  const projects = userObj.map((user) => {
    const joined = {
      ...user,
      projectIds: [],
    }
    joined.projectIds = projectObj.reduce((m, i) => i.userId === user.id ? [...m, i.id] : m, [])
    return joined;
  });
  return projects;
}

module.exports.promisifyGet = (url, options) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res, err) => {
      if (err) reject(err);
      res.setEncoding('utf8');
      let data = ''
      res.on('data', (chunk) => { data += chunk });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      })
    })
  })
}