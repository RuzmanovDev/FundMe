'use strict';

module.exports = {
    validateLength(password, min, max) {
        return min <= password && password <= max;
    },
    validatePassword(text) {
        const PasswordMinLength = 3;
        const PasswordMaxLength = 20;

        return this.validateLength(text, PasswordMinLength, PasswordMaxLength);
    }
}