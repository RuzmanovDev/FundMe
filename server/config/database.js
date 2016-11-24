const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config, logger) => {
    mongoose.connect(config.localDB);

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            logger.log('Database error :', err);
        }
    });
};

