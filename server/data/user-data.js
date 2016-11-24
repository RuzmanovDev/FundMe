/* globals module, require */

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
                console.log(user);
                
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