'use strict';

const encryption = require('../utilities/encryption');

module.exports = function (data) {
    return {
        login(){

        },
        register(user){
            console.log(user.body);
            let username = user.body.username;
            let passhas = user.body.password;
            let repeatPassHash = user.body.password;

console.log(data);
            data.createUser(username,passhas)
            .then((user)=> {
                console.log(user);
            },(err)=> console.log(err));
        }
    };
};