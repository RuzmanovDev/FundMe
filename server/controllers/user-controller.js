'use strict';


module.exports = function ({grid, data, database}) {
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
            console.log(req.body);
            let infoToUpdate = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
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
                        res.redirect('/user/settings');
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