/*globals */
'use strict';

const router = require('express').Router();
const userController = require('../controllers/user-controller');

module.exports = function (app, data) {

    router
        .get('/login',userController(data).getLogin)
        .get('/register', userController(data).getRegister);

    app.use(router);
};
