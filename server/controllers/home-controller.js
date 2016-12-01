'use strict';

module.exports = (data) => {
    return {
        getHome(req, res) {
            res.render('home/home');
        },
        getAbout(req, res) {
            res.render('home/about');
        }

    };
};