'use strict';

module.exports = {
    hasLoggedUser(req, res, next) {
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
    },
    isBlockedUser(req, res, next) {
        if (req.user && !req.user.isBlocked) {
            next();
        } else {
            res.status(401).redirect('/home/error/');
        }
    }
};