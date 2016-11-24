/* globals module, require */

const encryption = require('../utilities/encryption');

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
        createUser(username, passHash, email) {
            return new Promise((resolve, reject) => {
                let user = new User({
                    username,
                    passHash,
                    email
                });

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