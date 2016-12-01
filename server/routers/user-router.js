'use strict';

const router = require('express').Router();

module.exports = function ({upload, auth, app, grid, data, database }) {

    const userController = require('../controllers/user-controller')({ grid, data, database });

    router
        .get('/profile/:id', userController.getUserDetails)
        // .get('/my-profile', auth.isAuthenticated, userController.getOwnProfile)
        .get('/settings', auth.isAuthenticated, userController.getSettings)
        .post('/settings/update', upload.single('avatar'), userController.updateSettings)
        .get('/avatar/:id', userController.getAvatar);

    app.use('/user', router);
};