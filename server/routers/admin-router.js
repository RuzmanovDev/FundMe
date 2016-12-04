'use strict';

const router = require('express').Router();

module.exports = function({ data, app, auth, userMiddleware }) {
    const adminController = require('../controllers/admin-controller')({ data });

    router
        .get('/profiles', auth.isInRole('admin'), userMiddleware.isBlockedUser, adminController.getProfiles)
        .put('/users', auth.isInRole('admin'), userMiddleware.isBlockedUser, adminController.updateUser)
        .get('/users', auth.isInRole('admin'), userMiddleware.isBlockedUser, adminController.getUsersData);

    app.use(userMiddleware.hasLoggedUser);
    app.use('/admin', router);
};