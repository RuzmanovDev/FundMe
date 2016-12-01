/*globals */
'use strict';

const passport = require('passport');
const router = require('express').Router();

module.exports = function ({data, app}) {
    const authController = require('../controllers/auth-controller')({ data });

    router
        .get('/login', authController.getLogin)
        .get('/register', authController.getRegister)
        .post('/login', passport.authenticate('local'), authController.login)
        //.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), authController.login)
        .post('/register', authController.register)
        .post('/logout', authController.logout);

    app.use('/auth', router);
};