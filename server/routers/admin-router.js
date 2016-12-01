'use strict';

const router = require('express').Router();


module.exports = function ({data, app, auth}) {
    const adminController = require('../controllers/admin-controller')({ data });

    router
        .get('/profiles', /*auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.getProfiles)
        .put('/users', /* auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.updateUser)
        .get('/users', /* auth.isAuthenticated, auth.isInRole('Admin'), */ adminController.getUsersData);
    // .get('/users', auth.isAuthenticated, /*auth.isInRole('Admin'), */ adminController.getAllUsers);

    app.use('/admin', router);
};