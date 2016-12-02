/*globals */
'use strict';

const passport = require('passport');
const router = require('express').Router();

module.exports = function ({data, app, encryption}) {
    const authController = require('../controllers/auth-controller')({ data, encryption });

    router
        .get('/login', authController.getLogin)
        .get('/register', authController.getRegister)
        .post('/login', passport.authenticate('local'), authController.login)
        .post('/register', authController.register)
        .post('/logout', authController.logout);

    app.use('/auth', router);
};