const auth = require('../config/auth');
const router = require('express').Router();

module.exports = function (options) {
    let controller = require('../controllers/campaign-controller')(options);

    router
        .get('/', controller.getAll)
        .get('/create', auth.isAuthenticated, controller.getCreateForm)
        .post('/create', auth.isAuthenticated, options.upload.single('avatar'), controller.create)
        .get('/campaign/:id', controller.getById)
        .post('/campaign/:id', auth.isAuthenticated, controller.createComment)
        .put('/campaign/vote/:id', auth.isAuthenticated, controller.vote)
        .get('/campaign/picture/:id', controller.getPicture)
        .get('/campaign/category/:name', controller.getByCategory)
        .post('/donate', auth.isAuthenticated, controller.donate);

    options.app.use((req, res, next) => {
        let avatar = false;
        let username = false;
        let loggedUser = false;

        if (req.user) {
            avatar = req.user.avatar;
            username = req.user.username;
            loggedUser = req.user;
        }

        res.locals = {
            avatar,
            loggedUser,
            username
        };

        next();
    });

    options.app.use('/campaigns', router);
};