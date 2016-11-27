'use strict';
const encryption = require('../utilities/encryption');

module.exports = function (data) {
    return {
        login(req, res) {
            let userFromTheRequest = req.body;
            
            if (userFromTheRequest) {
                res.status(200).json({
                    success: true,
                    redirect: '/campaigns'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            };

            if (req.body.password !== req.body.confirmedPassword) {
                // to do make global error and send the error message
                res.send(JSON.stringify('The passsword do not match'));
            }

            const salt = encryption.generateSalt();
            const passHash = encryption.generateHashedPassword(salt, user.password);

            data.createUser(user.username, passHash, user.email, salt)
                .then((user) => {
                    return res.render('home/home');
                })
                .catch((err) => {
                    res.send('User with the same username already exists!');
                    console.log(err);
                });
        },
        logout(req, res) {
            req.logout();
            res.redirect('/');
        },
        getLogin(req, res) {
            //todo Is this code correct?
            res.status(200).render('user/login');
        },
        getRegister(req, res) {
            res.status(200).render('user/register');
        }
    };
};