/*globals */
'use strict';

const passport = require('passport');
const router = require('express').Router();

module.exports = function (options) {
    const authController = require('../controllers/auth-controller')(options.data);

    router
        .post('/login', passport.authenticate('local', { successRedirect: '/user/settings' }), authController.login)
        .post('/register', authController.register);

    options.app.use('/auth', router);
};
