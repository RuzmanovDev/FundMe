'use strict';

const router = require('express').Router();

module.exports = function({ data, app, userMiddleware }) {
    const homeController = require('../controllers/home-controller')({ data });

    router
        .get('/', homeController.getHome)
        .get('/about', homeController.getAbout)
        .get('/error', homeController.showError);

    app.use(userMiddleware.hasLoggedUser);
    app.use('/home', router);
};