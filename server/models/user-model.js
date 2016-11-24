/* globals const, module, require */
'use strict';

const mongoose = require('mongoose');

const minUsernameLength = 3;
const maxUsernameLength = 20;
const minPasswordLength = 3;
const maxPasswordLength = 20;

function validateLength(value, min, max) {
    if (!max) {
        max = min;
        min = 3;
    }

    return min <= value.length && value.length <= max;
}

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validateLength(value, minUsernameLength, maxUsernameLength);
            },
            message: '{VALUE} is not a valid username!'
        }
    },
    passHash: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validateLength(value, minPasswordLength, maxPasswordLength);
            },
            message: '{VALUE} is not a valid pass!'
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                // TO DO : REGEX for email
            },
            message: '{VALUE} is not a valid pass!'
        }
    },
    salt: String,
    roles: [String]
});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');