/*globals */
'use strict';

const passport = require('passport');
const router = require('express').Router();

module.exports = function (options) {
    const authController = require('../controllers/auth-controller')(options.data);

    router
        .get('/login', authController.getLogin)
        .get('/register', authController.getRegister)
        .post('/login', passport.authenticate('local'), authController.login)
        //.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), authController.login)
        .post('/register', authController.register)
        .post('/logout', authController.logout);

    options.app.use('/auth', router);
};