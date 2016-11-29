'use strict';

module.exports = (data) => {
    return {
        getAllUsers(req, res) {
            data.getAllUsers()
                .then((users) => {
                    res.status(200).render('administration/all-users', {
                        users: users
                    });
                });
        }
    };
};