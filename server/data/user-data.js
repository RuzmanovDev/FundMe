/* globals module, require */
'use strict';

const validator = require('./utils/validator');


module.exports = (models) => {
    const { User } = models;

    return {
        getById(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
            });
        },
        getByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
            });
        },
        createUser(username, passHash, email, salt) {
            return new Promise((resolve, reject) => {
                // '' is the default value
                console.log(username);
                let user = new User({
                    firstname: '',
                    lastname: '',
                    username,
                    passHash,
                    email,
                    salt,
                    roles: ['regular']
                });
                console.log(user.username);
                console.log(username === user.username);
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(user);
                    }
                });
            });
        }
    };
};