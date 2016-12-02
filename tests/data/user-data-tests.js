/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let {expect} = chai;


describe('User data tests', () => {
    let sinon;
    let User = require('./mocks/user-data-mock');
    let data = require('../../server/data/user-data')({ User });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('getById()', () => {
        let existingUserId = 2;

        let user = {
            _id: existingUserId
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, 'findOne', (query, cb) => {
                let id = query._id;
                let foundUser = users.find(u => u._id === id);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return the user by gived id', (done) => {
            data.getById(existingUserId)
                .then((actualUser) => {
                    expect(actualUser).to.equal(user);

                }).then(done, done);
        });

        it('Expect to return undefined when the user is not found', (done) => {
            data.getById(10)
                .then((foundUser) => {
                    expect(foundUser).to.be.undefined;
                }).then(done, done);
        });
    });

    describe('getByEmail()', () => {
        let existingEmail = 'pesho@telerik.com';

        let user = {
            email: existingEmail
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, 'findOne', (query, cb) => {
                let email = query.email;
                let foundUser = users.find(u => u.email === email);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return the user by given email', (done) => {
            data.getByEmail(existingEmail)
                .then((foundUser) => {
                    expect(foundUser).to.equal(user);
                }).then(done, done);
        });

        it('Expect to return undefined when the user is not found', (done) => {
            data.getByEmail('some@random.email')
                .then((foundUser) => {
                    expect(foundUser).to.be.undefined;
                }).then(done, done);
        });
    });

    describe('getByUsername()', () => {
        let existingUsername = 'Pesho';

        let user = {
            username: existingUsername
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, 'findOne', (query, cb) => {
                let username = query.username;
                let foundUser = users.find(u => u.username === username);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return the user by given username', (done) => {
            data.getByUsername(existingUsername)
                .then((foundUser) => {
                    expect(foundUser).to.equal(user);
                }).then(done, done);
        });

        it('Expect to return undefined when the user is not found', (done) => {
            data.getByUsername('some-random-username')
                .then((foundUser) => {
                    expect(foundUser).to.be.undefined;
                }).then(done, done);
        });
    });

    describe('createUser()', () => {
        beforeEach(() => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to save the user with correct properties', (done) => {
            let username = 'Pesho';
            let passHash = 'hashhh';
            let email = 'pesho@djagascript.com';
            let salt = 'soleno';

            data.createUser(username, passHash, email, salt)
                .then((actualUser) => {
                    expect(actualUser.username).to.equal(username);
                    expect(actualUser.passHash).to.equal(passHash);
                    expect(actualUser.email).to.equal(email);
                    expect(actualUser.salt).to.equal(salt);
                }).then(done, done);
        });


    });

    describe('updateUser()', () => {
        let expectedUser = {
            id: 1,
            firstname: 'Pesho',
            lastname: 'Petrov',
            avatar: 'Batman',
            email: 'nqkakuvemailtam',
            isBlocked: false,
            passHash: 'heshiranaparola',
            roles: []
        };

        let dummyUser = {
            id: 1,
            firstname: 'Asen',
            lastname: 'Hafte',
            avatar: 'Kofa',
            email: 'jeuezo@fakulteta.com',
            isBlocked: true,
            passHash: 'nqkuv hash',
            roles: []
        };
        let users = [dummyUser];

        beforeEach(() => {
            sinon.stub(User.prototype, 'save', (cb) => {
                cb(null);
            });
            sinon.stub(User, 'findOne', (query, cb) => {
                let id = query._id;
                let foundUser = users.find(u => u.id === id);

                foundUser.assignRole = (role) => {
                    foundUser.roles.push(role);
                };
                foundUser.removeRole = (role) => {
                    foundUser.roles.splice(foundUser.roles.indexOf(role), 1);
                };
                foundUser.save = () => { };
                cb(null, foundUser);
            });

        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to update user properties', (done) => {

            data.updateUser(1, expectedUser)
                .then((actualUser) => {
                    expect(actualUser.firstname).to.equal(expectedUser.firstname);
                    expect(actualUser.lastname).to.equal(expectedUser.lastname);
                    expect(actualUser.avatar).to.equal(expectedUser.avatar);
                    expect(actualUser.email).to.equal(expectedUser.email);
                    expect(actualUser.isBlocked).to.equal(expectedUser.isBlocked);
                    expect(actualUser.passHash).to.equal(expectedUser.passHash);
                })
                .then(done, done);
        });
    });
});
