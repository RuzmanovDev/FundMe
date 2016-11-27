const express = require('express');

module.exports = function (options) {
    let controller = require('../controllers/campaign-controller')(options);

    let router = new express.Router();

    router
        .get('/', controller.getAll)
        .get('/create', controller.getCreateForm)
        .post('/create', options.upload.single('avatar'), controller.create)
        .get('/campaign/:id', controller.getById)

        .get('/campaign/picture/:id', controller.getPicture)
        .get('/campaign/category/:name', controller.getByCategory)
        .post('/donate', controller.donate);

    options.app.use('/campaigns', router);
};