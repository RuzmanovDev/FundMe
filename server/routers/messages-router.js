const auth = require('../config/auth');
const router = require('express').Router();

module.exports = function (options) {
    let controller = require('../controllers/messages-controller')(options);

    router
    .get('/', auth.isAuthenticated, controller.getMessageForm)
    //.get('/:id',auth.isAuthenticated,controller.exactMessage);

    options.app.use('/messages', router);
};