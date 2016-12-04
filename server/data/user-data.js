/* globals module, require */
'use strict';

module.exports = (models) => {
    const { User } = models;

    return {
        filterUsers(filter, page, perPage) {
            filter = filter || {};
            page = page || 0;
            perPage = perPage || 0;
            return new Promise((resolve, reject) => {
                User.find(filter)
                    .skip(page * perPage)
                    .limit(perPage)
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
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
                        foundUser.isBlocked = info.isBlocked;
                        foundUser.passHash = info.passHash || foundUser.passHash;

                        if (info.isAdmin) {
                            foundUser.assignRole('admin');
                        } else {
                            foundUser.removeRole('admin');
                        }

                        foundUser.save();
                        resolve({
                            userId: foundUser.id,
                            avatar: foundUser.avatar,
                            username: foundUser.username,
                            email: foundUser.email,
                            firstname: foundUser.firstname,
                            lastname: foundUser.lastname,
                            isAdmin: foundUser.isAdmin,
                            isBlocked: foundUser.isBlocked,
                            passHash: foundUser.passHash
                        });
                    });
            });
        }
    };
};