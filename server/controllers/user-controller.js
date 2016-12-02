'use strict';

module.exports = function ({grid, data, database, encryption}) {
    return {
        getUserDetails(req, res) {
            let userId = req.params.id;
            Promise.all([
                data.getById(userId),
                data.getUserCampaigns(userId)
            ])
                .then((result) => {
                    let user = result[0];
                    let campaigns = result[1];

                    res.status(200).render('user/user-details', {
                        user,
                        campaigns
                    });
                });
        },
        getSettings(req, res) {
            res.status(200).render('user/settings', {
                avatar: req.user.avatar,
                user: req.user,
                username: req.user.username,
                wrongPassword: false,
                passwordsDoNotMatch: false
            });
        },
        updateSettings(req, res) {
            let gfs = grid(database.connection.db, database.mongo);

            let user = req.user;
            let userSalt = req.user.salt;
            let oldPassword = req.body.oldPassword;
            let userHash = req.user.passHash;
            let newUserHash;
            console.log(req.body);

            if (oldPassword) {
                let hashedEnteredPassword = encryption.generateHashedPassword(userSalt, oldPassword);
                if (userHash !== hashedEnteredPassword) {
                    res.status(401).render('user/settings', { wrongPassword: true });
                    return;
                }

                if (req.body.newPassword !== req.body.confirmedNewPassword) {
                    res.status(401).render('user/settings', { passwordsDoNotMatch: true });
                    return;
                } else if (req.body.newPassword === req.body.confirmedNewPassword && req.body.newPassword !== '') {
                    newUserHash = encryption.generateHashedPassword(userSalt, req.body.newPassword);
                }
            }


            let infoToUpdate = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                passHash: newUserHash,
                avatar: user.avatar
            };

            let file = req.file;
            if (file) {
                file.buffer = req.file.buffer;
            } else {
                file = { buffer: '' };
            }

            gfs.writeFile({}, file.buffer, (_, foundFile) => {
                if (file.buffer) {
                    infoToUpdate.avatar = foundFile._id;
                }

                data.updateUser(user._id, infoToUpdate)
                    .then(() => {
                        res.status(201).render('user/settings', { wrongPassword: false, passwordsDoNotMatch: false });
                    });
            });
        },
        getAvatar(req, res) {
            var gfs = grid(database.connection.db, database.mongo);
            var id = req.params.id;

            gfs.readFile({ _id: id }, (_, data) => {
                res.write(data);
                res.end();
            });
        }
    };
};