const os = require('os');

module.exports = {
    log(input) {
        var date = Date.now();
        console.log(date + os.EOL + input);
    }
};