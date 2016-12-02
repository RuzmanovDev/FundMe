'use strict';

module.exports = function({ data }) {
    function getClientFilter(query) {
        let filter = {};
        for (let prop in query) {
            if (query[prop] && prop !== 'pageIndex' && prop !== 'pageSize') {
                filter[prop] = query[prop];
            }
        }

        return filter;
    }

    return {
        getProfiles(req, res) {
            res.status(200).render('administration/profiles');
        },
        getUsersData(req, res) {
            let filter = getClientFilter(req.query);
            let page = +req.query.pageIndex - 1;
            let perPage = +req.query.pageSize;
            data.filterUsers(filter, page, perPage)
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
                        };
                    });
                    // res.status(200).json({
                    //     data: result,
                    //     itemsCount: result.length
                    // });

                    res.status(200).json(result);
                });
        },
        updateUser(req, res) {
            let userInfo = req.body;
            data.updateUser(userInfo.userId, userInfo)
                .then((updatedUser) => {
                    res.status(200).json(updatedUser);
                });
        }
    };
};