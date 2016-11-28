'use strict';

const router = require('express').Router();

module.exports = function (options) {
    const homeController = require('../controllers/home-controller')(options.data);

    router
        .get('/', homeController.getHome);


    options.app.use((req, res, next) => {
        let avatar = '';
        let username = '';
        let user = '';

        if (req.user) {
            avatar = req.user.avatar;
            username = req.user.username;
            user = req.user;
        }

        res.locals = {
            avatar,
            user,
            username
        };
        next();
    });

    options.app.use('/home', router);
};