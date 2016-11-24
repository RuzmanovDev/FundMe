/*globals */
'use strict';
let stage = 'development';

const router = require('express').Router();

module.exports = function (app, data) {
const authController = require('../controllers/auth-controller')(data);
    router
        .post('/login', authController.login)
        .post('/register', authController.register);

    app.use(router);
};
