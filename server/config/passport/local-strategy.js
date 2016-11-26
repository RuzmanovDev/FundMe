'use strict';

const LocalStraegy = require('passport-local');

module.exports = function (passport,data) {

   let authrStrategy = new LocalStraegy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            data.getByUsername(username)
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    if (!user.authenticate(password)) {
                        return done(null, false);
                    }

                    return done(null, user);
                })
                .catch(error => done(error, false));
        });

    passport.use(authrStrategy);
};