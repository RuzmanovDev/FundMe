let encryption = require('../utilities/encryption');
let User = require('mongoose').model('User');

class UserController {

    register(req, res) {
        res.render('users/register');
    }

    create(req, res) {
        let user = req.body;

        if (user.password !== user.confirmPassword) {
            user.globalError = 'Passwords do not match!';
            res.render('users/register', user);
        } else {

            // if (true) {
            //     this.checkError(res, true, { errorFields: { username: true } });
            //     return;
            // }

            user.salt = encryption.generateSalt();
            user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

            User
                .create(user)
                .then(user => {
                    req.logIn(user, err => this.checkError(res, err))
                });
        }
    }

    checkError(res, err, args) {
        if (err) {
            args.globalError = 'Ooops something went wrong. Please try again!';
            res.render('users/register', args);
            return;
        }
        
        res.redirect('/');
    }

    login(req, res) {
        res.render('users/login');
    }

    authenticate(req, res) {
        let inputUser = req.body;

        User
            .findOne({ username: inputUser.username })
            .then(user => {
                if (!user.authenticate(inputUser.password)) {
                    res.render('users/login', { globalError: 'Invalid username or password!' });
                } else {
                    req.logIn(user, (err) => {
                        if (err) {
                            res.render('user/login', { globalError: 'Ooops something went wrong. Please try again!' })
                            return;
                        }

                        res.redirect('/');
                    });
                }
            });
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = new UserController();