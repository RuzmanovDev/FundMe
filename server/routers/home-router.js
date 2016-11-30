'use strict';

const router = require('express').Router();

module.exports = function (options) {
    const homeController = require('../controllers/home-controller')(options.data);

    router
        .get('/', homeController.getHome);

  options.app.use((req, res, next) => {
        let avatar = false;
        let username = false;
        let loggedUser = false;

        if (req.user) {
            avatar = req.user.avatar;
            username = req.user.username;
            loggedUser = req.user;
        }

        res.locals = {
            avatar,
            loggedUser,
            username
        };

        next();
    });

    options.app.use('/home', router);
};