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
        updateUser(userId, info) {
            return new Promise((resolve, reject) => {
                this.getById(userId)
                    .then((foundUser) => {
                        foundUser.avatar = info.avatar || foundUser.avatar;
                        foundUser.firstname = info.firstname || foundUser.firstname;
                        foundUser.lastname = info.lastname || foundUser.lastname;
                        foundUser.email = info.email || foundUser.email;
                        foundUser.isBlocked = info.isBlocked || foundUser.isBlocked;
                        foundUser.passHash = info.passHash || foundUser.passHash;

                        let isAdmin = !info.isAdmin;
                        if (isAdmin) {
                            console.log('IN IF');
                            foundUser.assignRole('admin');
                        } else {
                            foundUser.removeRole('admin');
                        }

                        foundUser.save();
                        resolve({
                            userId: foundUser.id,
                            username: foundUser.username,
                            email: foundUser.email,
                            firstname: foundUser.firstname,
                            lastname: foundUser.lastname,
                            passHash: foundUser.passHash,
                            isAdmin: foundUser.isAdmin,
                            isBlocked: foundUser.isBlocked
                        });
                    });
            });
        }
    };
};