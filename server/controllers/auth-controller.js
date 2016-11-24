'use strict';

const encryption = require('../utilities/encryption');

module.exports = function (data) {
    return {
        login() {

        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            };

            console.log(user);
            data.createUser(user.username, user.password, user.email)
                .then((user) => {
                    console.log(user);
                    res.redirect('/');
                }, (err) => console.log(err));
        }
    };
};