const express = require('express');

module.exports = function (app, data){
    let controller = require('../controllers/campaign-controller')(data);

    let router = new express.Router();

    router
    .get('/', controller.getAll)
    .get('/:id', controller.getById);

    app.use('/campaigns', router);
};