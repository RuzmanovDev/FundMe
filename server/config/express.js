'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = (config, app) => {
    app.locals.moment = require('moment');
    app.set('view engine', 'pug');
    app.set('views', config.rootPath + 'server/views');
    app.use('/public', express.static(config.rootPath + '/public'));

    app.use(cookieParser());
    app.use(session({
        secret: 'djagascript', cookie: { maxAge: 60 * 60 * 60 * 1000 },
        rolling: true, resave: true, saveUninitialized: false
    }));

    require('./passport')(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};