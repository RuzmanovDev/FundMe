'use strict';

const router = require('express').Router();

module.exports = function (options) {

    const userController = require('../controllers/user-controller')(options);

    // TODO Move login and register to auth-router and controller
    router
        .get('/login', userController.getLogin)
        .get('/register', userController.getRegister)
        .get('/user/settings', userController.getSettings)
        .post('/settings/update', options.upload.single('avatar'), userController.updateSettings)
        .get('/users/avatars/:id', userController.getAvatar);
    options.app.use(router);
};
