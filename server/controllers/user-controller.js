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
                username: req.user.username
            });
        },
        updateSettings(req, res) {
            let gfs = grid(database.connection.db, database.mongo);
            let user = req.user;
            let userSalt = req.user.salt;
            let oldPassword = req.body.oldPassword;
            let userHash = req.user.passHash;
            let newUserHash;

            if (oldPassword) {
                let hashedEnteredPassword = encryption.generateHashedPassword(userSalt, oldPassword);
                if (userHash !== hashedEnteredPassword) {
                    res.status(401).json({ msg: 'You have entered wrong passowrd!' });
                    return;
                }

                if (req.body.newPassword !== req.body.confirmedNewPassword) {

                    res.status(401).json({ msg: 'Password do not match' });
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
                        res.status(201).json({
                            success: true,
                            redirect: '/user/settings'
                        });
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