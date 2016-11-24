'use strict';

const LocalStraegy = require('passport-local');

module.exports = function (passport, data) {
    const authrStrategy = new LocalStraegy(
         (username, password, done) => {
            data.findByUsername(username)
                .then(user => {
                    if(user && (user.password === password)){
                        done(null, user);
                    }else{
                        done(null, false);
                    }
                })
                .catch(error => done(error, false));
         });

    passport.use(authrStrategy);
  };