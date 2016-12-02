const auth = require('../config/auth');
const router = require('express').Router();

module.exports = function (options) {
    let controller = require('../controllers/messages-controller')(options);

    router
        .get('/', auth.isAuthenticated, controller.getMessageForm)
        .post('/', auth.isAuthenticated, controller.initializeMessage)
        //.get('/texts', auth.isAuthenticated,controller.getTexts);

    options.app.use('/messages', router);
};