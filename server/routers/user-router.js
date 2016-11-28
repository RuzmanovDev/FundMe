'use strict';

const router = require('express').Router();
const auth = require('../config/auth');

module.exports = function (options) {

    const userController = require('../controllers/user-controller')(options);

    router
        .get('/profile/:id', userController.getUserDetails)
        // .get('/my-profile', auth.isAuthenticated, userController.getOwnProfile)
        .get('/settings', auth.isAuthenticated, userController.getSettings)
        .post('/settings/update', options.upload.single('avatar'), userController.updateSettings)
        .get('/avatar/:id', userController.getAvatar);

    options.app.use('/user', router);
};