const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

let requiredValidationMessage = '{PATH} is required';

let userSchema = mongoose.Schema({
    username: { type: String, required: requiredValidationMessage, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salt: String,
    hashedPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (inputHashedPassword === this.hashedPass) {
            return true;
        }

        return false;
    }
});

let User = mongoose.model('User', userSchema);

module.exports.seedAdminUser = () => {
    User.find({}).then((users) => {
        if (users.length > 0) {
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, '1234');
        User.create({
            username: 'Admin',
            firstName: 'Admin',
            lastName: 'Adminov',
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Admin']
        });
    });
}
