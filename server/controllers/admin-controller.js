'use strict';

module.exports = (data) => {
    return {
        getProfiles(req, res) {
            res.status(200).render('administration/profiles');
        },
        getUsersData(req, res) {
            data.getAllUsers()
                .then((users) => {
                    const result = users.map((user) => {
                        return {
                            userId: user.id,
                            username: user.username,
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            isAdmin: user.isAdmin,
                            isBlocked: user.isBlocked
                        }
                    });
                    res.status(200).json(result);
                });
        },
        updateUser(req, res) {
            let userInfo = req.body;
            data.updateUser(userInfo.userId, userInfo)
                .then((updatedUser) => {
                    res.status(200).json(updatedUser);
                })
        }
    };
};