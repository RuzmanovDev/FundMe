'use strict';
const encryption = require('../utilities/encryption');

module.exports = function (data) {
    return {
        login(req, res) {
            let userFromTheRequest = req.body;

            data.getByUsername(userFromTheRequest.username)
                .then((user) => {
                    let userSalt = user.salt;
                    let userHashedPassword = user.passHash;
                    let hashedPasswordFromRequest = encryption.generateHashedPassword(userSalt, userFromTheRequest.password);

                    if (userHashedPassword === hashedPasswordFromRequest) {
                        res.render('home/home');
                    } else {
                        res.send('Ne moja da se lognesh');
                    }
                });
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            };

            if (req.body.password !== req.body.confirmedPassword) {
                // to do make global error and send the error message
                res.send('The passsword do not match');
            }

            const salt = encryption.generateSalt();
            const passHash = encryption.generateHashedPassword(salt, user.password);

            let u = data.getByUsername(user.username);

            data.createUser(user.username, passHash, user.email, salt)
                .then((user) => {
                    console.log(user);
                    res.redirect('/');
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        },
        logout(req, res) {
            req.logout();
            res.redirect('/');
        }
    };
};