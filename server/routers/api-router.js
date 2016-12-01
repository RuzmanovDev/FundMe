const router = require('express').Router();

module.exports = function ({app, data, auth, grid, database}) {
    let controller = require('../controllers/api-controller')({ grid, database, data });

    router
        .get('/comments/:campaignId', controller.getCommentsJson);

    app.use('/api', router);
};