const express = require('express');
const auth = require('../config/auth');

module.exports = function (options) {
    let controller = require('../controllers/campaign-controller')(options);

    let router = new express.Router();

    router
        .get('/home', (req, res) => {
            res.render('home/home');
        })
        .get('/', controller.getAll)
        .get('/create', auth.isAuthenticated, controller.getCreateForm)
        .post('/create', auth.isAuthenticated, options.upload.single('avatar'), controller.create)
        .get('/campaign/:id', controller.getById)
        .post('/campaign/:id', auth.isAuthenticated, controller.createComment)
        .post('/campaign/upvote/:id', auth.isAuthenticated, controller.upVote)
        .get('/campaign/picture/:id', controller.getPicture)
        .get('/campaign/category/:name', controller.getByCategory)
        .post('/donate', auth.isAuthenticated, controller.donate);

    options.app.use('/campaigns', router);
};