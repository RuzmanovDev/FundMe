const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));
const PORT = process.env.PORT || 1337;
module.exports = {
    development: {
        rootPath: rootPath,
        connectionString: 'mongodb://localhost:27017/testing',
        port: PORT
    },
    production: {
        rootPath: rootPath,
        connectionString: 'mongodb://admin:djagascript1234@ds161487.mlab.com:61487/djagascript',
        port: PORT
    }
};