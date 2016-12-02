'use strict';


module.exports = function ({data, encryption}) {
    return {
        login(req, res) {
            let userFromTheRequest = req.body;

            if (userFromTheRequest) {
                res.status(200).json({
                    success: true,
                    redirect: '/home'
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
                res.status(401);
                return;
            }

            const salt = encryption.generateSalt();
            const passHash = encryption.generateHashedPassword(salt, user.password);

            Promise.all([data.getByUsername(user.username), data.getByEmail(user.email)])
                .then(([username, email]) => {

                    if (username) {
                        res.status(409).json({
                            success: false,
                            message: 'Username already exist!'
                        });
                        return;
                    } else if (email) {
                        res.status(409).json({
                            success: false,
                            message: 'Email already exist!'
                        });
                        return;
                    }

                    data.createUser(user.username, passHash, user.email, salt)
                        .then(() => {
                            res.status(201).json({
                                success: true,
                                redirect: '/user/settings'
                            });
                        });
                });
        },
        logout(req, res) {
            req.logout();
            res.status(202).redirect('/auth/login');
        },
        getLogin(req, res) {
            res.status(200).render('user/login');
        },
        getRegister(req, res) {
            res.status(200).render('user/register');
        }
    };
};