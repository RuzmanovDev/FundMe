/* globals const, module, require */

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
    username: {
        type: String,
        required: true,
        validate: [validateLength(value, minUsernameLength, maxUsernameLength), 'Username is invalid!']
    },
    password: {
        type: String,
        required: true,
        validate: [validateLength(value, minPasswordLength, maxPasswordLength), 'Password is invalid!']
    }
});

mongoose.model('User', userSchema);
const User = mongoose.model('User');
module.exports = User;