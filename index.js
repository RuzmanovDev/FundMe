'use strict';

const express = require('express');

let app = express();

let stage = 'development';

let config = require('./server/config/config')[stage];
let logger = require('./server/utilities/logger');

require('./server/config/database')(config, logger);
require('./server/config/express')(config, app);

app.get('/', (req, res) => {
    res.render('shared/_layout');
});

app.listen(config.localPort, () => console.log('Server running at port : ' + config.localPort));


