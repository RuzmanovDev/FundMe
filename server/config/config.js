const path = require('path');

let rootPath = path.normalize(path.join(__dirname + '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        localDB: 'mongodb://localhost:27017/testing',
        cloudDB: 'mongodb://admin:djagascript1234@ds161487.mlab.com:61487/djagascript',
        localPort: 1337,
        cloudPort: 8080
    }
};