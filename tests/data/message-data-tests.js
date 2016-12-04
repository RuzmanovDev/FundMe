/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let {expect} = chai;

describe('Message data test', () => {
    let sinon;
    let Message = require('./mocks/message-model-mocks');
    let data = require('../../server/data/message-data')({ Message });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('loadCurrentConversations()', () => {
        let firstUserId = 2;
        let secondUserId = 3;

        let firstUser = {
            _id: firstUserId
        };

        let secondUser = {
            _id: secondUserId
        };

        let expectedMessages = [
            {
                firstUser,
                secondUser,
                content: 'test'
            }
        ];

        beforeEach(() => {
            sinon.stub(Message, 'find', (query, cb) => {
                let foundMessages = expectedMessages
                    .find(m => m.firstUser._id === firstUser._id || m.secondUser._id === secondUser._id);
                cb(null, foundMessages);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return messages in conversation by given firstUserID', (done) => {
            data.loadCurrentConversations(firstUserId)
                .then((messages) => {
                    expect(messages).to.equal(expectedMessages[0]);
                })
                .then(done, done);
        });

        it('Expect to return messages in conversation by given secondUser', (done) => {
            data.loadCurrentConversations(secondUserId)
                .then((messages) => {
                    expect(messages).to.equal(expectedMessages[0]);
                })
                .then(done, done);
        });
    });

    describe('createConversation()', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('Expect createConversation() to save the conversation', (done) => {
            sinon.stub(Message.prototype, 'save', cb => {
                cb(null);
            });

            let args = {
                firstUser: {},
                secondUser: {},
                identification: {}
            };

            let conversation = {
                firstUser: {},
                secondUser: {},
                identification: {},
                texts: undefined
            };

            data.createConversation(args)
                .then((createdConversation) => {
                    expect(conversation).to.eql(createdConversation);
                })
                .then(done, done);
        });

    });

    describe('findByIdentification()', () => {
        let identification = 'id';
        let conversation = { identification, firstUser: {}, secondUser: {}, texts: [] };
        let conversations = [conversation];

        beforeEach(() => {
            sinon.stub(Message, 'findOne', (params, cb) => {
                let found = conversations.find(c => c.identification === params.identification);
                cb(null, found);
            });

        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect findByIdentification to return correct value', (done) => {

            data.findByIdentification(identification)
                .then((foundConversation) => {
                    expect(foundConversation).to.equal(conversations[0]);
                }).then(done, done);
        });
    });

    describe('addMessage()', () => {
        let identification = 'id';
        let conversation = { identification, firstUser: {}, secondUser: {}, texts: [{}], save() { } };
        let conversations = [conversation];

        beforeEach(() => {
            sinon.stub(Message, 'findOne', (params, cb) => {
                let found = conversations.find(c => c.identification === params.identification);
                cb(null, found);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect message to be added', (done) => {
            let text = 'hello';
            let owner = {};
            let date = '3.12.2016';

            data.addMessage(identification, text, owner, date)
                .then(() => {
                    expect(conversation.texts.length).to.equal(2);
                })
                .then(done, done);
        });
    });
});

