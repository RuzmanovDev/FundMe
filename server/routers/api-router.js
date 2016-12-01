const auth = require('../config/auth');
const router = require('express').Router();

module.exports = function(options) {
    let controller = require('../controllers/api-controller')(options);

    router
        .get('/comments/:campaignId', controller.getCommentsJson);

    options.app.use('/api', router);
};