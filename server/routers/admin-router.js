'use strict';

const router = require('express').Router();

const auth = require('../config/auth');

module.exports = function(options) {
    const adminController = require('../controllers/admin-controller')(options.data);

    router
        .get('/all-users', auth.isAuthenticated, /*auth.isInRole('Admin'), */ adminController.getAllUsers);

    options.app.use('/admin', router);
};