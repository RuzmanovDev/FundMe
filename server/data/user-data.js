/* globals module, require */
'use strict';

const validator = require('./utils/validator');

module.exports = (models) => {
    const { User } = models;

    return {
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find({}, (err, users) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(users);
                    }
                });
            });
        },
        getById(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getByEmail(email) {
            return new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        createUser(username, passHash, email, salt) {
            let user = new User({
                firstname: ' ',
                lastname: ' ',
                username: username,
                passHash: passHash,
                email: email,
                salt: salt,
                roles: ['regular']
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        updateUser(id, info) {
            return Promise.resolve(
                this.getById(id)
                .then((foundUser) => {
                    foundUser.avatar = info.avatar || foundUser.avatar;
                    foundUser.firstname = info.firstname || foundUser.firstname;
                    foundUser.lastname = info.lastname || foundUser.lastname;
                    foundUser.save();
                })
            );
        }
    };
};