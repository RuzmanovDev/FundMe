/* globals module, require */
'use strict';

module.exports = (models) => {
    const { User } = models;

    return {
        filterUsers(filter, page, perPage) {
            filter = filter | {};
            page = page | 0;
            perPage = perPage | 0;
            return new Promise((resolve, reject) => {
                User.find(filter)
                    .skip(page * perPage)
                    .limit(perPage)
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(users);
                        }
                    })
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
        updateUser(userId, userData) {
            return new Promise((resolve, reject) => {
                this.getById(userId)
                    .then((dbUser) => {
                        dbUser.avatar = userData.avatar || dbUser.avatar;
                        dbUser.firstname = userData.firstname || dbUser.firstname;
                        dbUser.lastname = userData.lastname || dbUser.lastname;
                        dbUser.email = userData.email || dbUser.email;
                        dbUser.isBlocked = userData.isBlocked || dbUser.isBlocked;

                        if (userData.isAdmin === 'true') {
                            dbUser.assignRole('admin');
                        } else {
                            dbUser.removeRole('admin');
                        }

                        dbUser.save();
                        resolve({
                            userId: dbUser.id,
                            username: dbUser.username,
                            email: dbUser.email,
                            firstname: dbUser.firstname,
                            lastname: dbUser.lastname,
                            isAdmin: dbUser.isAdmin,
                            isBlocked: dbUser.isBlocked
                        });
                    });
            });
        }
    };
};