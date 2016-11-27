'use strict';

const router = require('express').Router();

module.exports = function(options) {
    const homeController = require('../controllers/home-controller')(options.data);

    router
        .get('/', homeController.getHome);

    options.app.use('/home', router);
};