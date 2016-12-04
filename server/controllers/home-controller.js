'use strict';

module.exports = function() {
    return {
        getHome(req, res) {
            res.render('home/home');
        },
        getAbout(req, res) {
            res.render('home/about');
        },
        showError(req, res) {
            res.render('home/error');
        }
    };
};