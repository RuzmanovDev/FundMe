'use strict';

module.exports = function (data) {
    return {
        getLogin(req, res) {
            //todo Is this code correct?
            res.status(200).render('user/login');
        },
        getRegister(req,res) {
            res.status(200).render('user/register');
        }
    };
};