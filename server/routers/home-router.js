'use strict';

const router = require('express').Router();

module.exports = function ({data, app}) {
    const homeController = require('../controllers/home-controller')({ data });

    router
        .get('/', homeController.getHome);

    app.use((req, res, next) => {
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

    app.use('/home', router);
};