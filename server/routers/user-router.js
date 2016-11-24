/*globals */
'use strict';

const router = require('express').Router();

module.exports = function (app, data) {

const userController = require('../controllers/user-controller')(data);

    router
        .get('/login',userController.getLogin)
        .get('/register', userController.getRegister);

    app.use(router);
};
