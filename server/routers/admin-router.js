'use strict';

const router = require('express').Router();

const auth = require('../config/auth');

module.exports = function(options) {
    const adminController = require('../controllers/admin-controller')(options.data);

    router
        .get('/profiles', /*auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.getProfiles)
        .get('/users', /* auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.getUsersData)
        .put('/users', /* auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.updateUser);
    // .get('/users', auth.isAuthenticated, /*auth.isInRole('Admin'), */ adminController.getAllUsers);

    options.app.use('/admin', router);
};