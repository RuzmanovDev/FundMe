const express = require('express');

module.exports = function (options){
    let controller = require('../controllers/campaign-controller')(options.data);

    let router = new express.Router();

    router
    .get('/', controller.getAll)
    .get('/:id', controller.getById);

    options.app.use('/campaigns', router);
};