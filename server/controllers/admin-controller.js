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
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            isAdmin: user.isAdmin
                        }
                    });
                    res.status(200).json(result);
                });
        },
        updateUser(req, res) {
            console.log(req.data);
            res.status(200);
        }
    };
};