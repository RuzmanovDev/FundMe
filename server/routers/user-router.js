'use strict';

const router = require('express').Router();

module.exports = function (options) {

    const userController = require('../controllers/user-controller')(options);

    router
        .get('/settings', userController.getSettings)
        .post('/settings/update', options.upload.single('avatar'), userController.updateSettings)
        .get('/avatar/:id', userController.getAvatar);

    options.app.use('/user', router);
};
