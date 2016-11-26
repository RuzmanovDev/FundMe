/* globals module, require */

'use strict';

const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const fieldsValidator = require('./utils/validator');

const MinUsernameLength = 3;
const MaxUsernameLength = 20;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return fieldsValidator.validateLength(value, MinUsernameLength, MaxUsernameLength);
            },
            message: '{VALUE} is not a valid username!'
        }
    },
    passHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {

                // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                // return re.test(value);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    salt: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        //TO DO - set dafault imageID
        default: '58376b58c14d6d15f8d4f3ab'
    },
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (inputHashedPassword === this.passHash) {
            return true;
        }

        return false;
    }
});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');